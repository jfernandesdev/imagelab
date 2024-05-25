"use client"

import { z } from "zod"
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { getCldImageUrl } from "next-cloudinary"

import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { CustomField } from "@/components/shared/CustomField"
import MediaUploader from "@/components/shared/MediaUploader"
import TransformedImage from "@/components/shared/TransformedImage"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { addImage, updateImage } from "@/lib/actions/image.actions"
import { updateCredits } from "@/lib/actions/user.actions"
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"
import { aspectRatioOptions, creditFee, defaultValues, transformationTypes } from "@/constants"
import { useRouter } from "next/navigation"
import { InsufficientCreditsModal } from "./InsufficientCreditsModal"
import { ConstructionModal } from "./ConstructionModal"

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string()
})

const TransformationForm = ({ action, data = null, userId, type, creditBalance, config = null }: TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  const [transformationConfig, setTransformationConfig] = useState(config);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const { toast } = useToast();

  const initialValues = data && action === 'Update' ? {
    title: data?.title,
    aspectRatio: data?.aspectRatio,
    color: data?.color,
    prompt: data?.prompt,
    publicId: data?.publicId,
  } : defaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues
  })

  const showErrorToast = (title: string, description: string) => {
    toast({
      title: title,
      description: description,
      duration: 5000,
      className: "error-toast"
    });
  };

  // Campo de seleção para proporção da imagem
  const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey];

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height
    }));

    setNewTransformation(transformationType.config);

    return onChangeField(value);
  };

  // Campo para descrição do objeto para o prompt/to
  const onInputChangeHandler = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void) => {
    debounce(() => {
      // Remover caracteres especiais, traços, vírgulas, espaços antes e depois
      const sanitizedValue = value.replace(/[^a-zA-Z0-9 ]/g, '').trim();
      const newValue = (type === 'recolor' && fieldName === 'color') ? sanitizedValue.replace('#', '') : sanitizedValue;

      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === 'prompt' ? 'prompt' : 'to']: newValue
        }
      }))
    }, 1000)();

    return onChangeField(value);
  };

  // Decrementar um crédito em cada transformação
  const onTransformHandler = async () => {
    try {
      setIsTransforming(true);

      const values = form.getValues();

      if (!values.title) {
        showErrorToast("Campo obrigatório!", "O título da imagem é obrigatório.");
        return;
      }

      if (type === "remove") {
        if (!values.prompt) {
          showErrorToast("Campo obrigatório!", "Informe o objeto para remover.");
        }
      }

      if (type === "recolor") {
        if (!values.prompt) {
          showErrorToast("Campo obrigatório!", "Informe o objeto para recolorir.");
          return;
        }

        if (!values.color) {
          showErrorToast("Campo obrigatório!", "Selecione a cor de substituição.");
          return;
        }
      }

      if (type === "fill" && !values.aspectRatio) {
        showErrorToast("Campo obrigatório!", "Selecione a proporção da tela.");
        return;
      }

      if (!values.publicId) {
        showErrorToast("Campo obrigatório!", "Faça upload de uma imagem.");
        return;
      }

      setTransformationConfig(
        deepMergeObjects(newTransformation, transformationConfig)
      );

      setNewTransformation(null);

      startTransition(async () => {
        await updateCredits(userId, creditFee);
          toast({
            title: "Transformação aplicada",
            description: "1 crédito usado",
            duration: 5000,
            className: "success-toast"
          });
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Houve um erro em sua transformação",
        description: "Revise e tente novamente.",
        duration: 5000,
        className: "error-toast"
      });
    } finally {
      setIsTransforming(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (!values.title) {
      toast({
        title: "Erro no formulário",
        description: "O título da imagem é obrigatório",
        duration: 5000,
        className: "error-toast"
      });
      setIsSubmitting(false);
      return;
    }

    if (!values.publicId) {
      toast({
        title: "Erro no formulário",
        description: "O upload de uma imagem é obrigatória.",
        duration: 5000,
        className: "error-toast"
      });
      setIsSubmitting(false);
      return;
    }

    if (data || image) {
      const transformationUrl = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig
      })

      const imageData = {
        title: values.title,
        publicId: image?.publicId,
        transformationType: type,
        width: image?.width,
        height: image?.height,
        config: transformationConfig,
        secureURL: image?.secureURL,
        transformationURL: transformationUrl,
        aspectRatio: values.aspectRatio,
        prompt: values.prompt,
        color: values.color,
      }

      if (action === "Add") {
        try {
          const newImage = await addImage({
            image: imageData,
            userId,
            path: '/'
          });

          if (newImage) {
            form.reset();
            setImage(data);
            router.push(`/transformations/${newImage._id}`);
          }
        } catch (error) {
          console.error(error);
        }
      }

      if (action === "Update") {
        try {
          const updatedImage = await updateImage({
            image: {
              ...imageData,
              _id: data._id
            },
            userId,
            path: `/transformations/${data._id}`
          });

          if (updatedImage) {
            router.push(`/transformations/${updatedImage._id}`);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (image && (type === 'restore' || type === 'removeBackground')) {
      setNewTransformation(transformationType.config)
    }
  }, [image, transformationType.config, type]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {creditBalance < Math.abs(creditFee) && !["crop", "compress"].includes(type) && <InsufficientCreditsModal userId={userId} />}

        {["crop", "compress"].includes(type) && <ConstructionModal />}

        <div className="prompt-field">
          <CustomField
            control={form.control}
            name="title"
            formLabel="Título da Imagem"
            className="w-full"
            render={({ field }) => (
              <Input {...field} className="input-field" />
            )}
          />

          {type === 'fill' && (
            <CustomField
              control={form.control}
              name="aspectRatio"
              formLabel="Proporção da tela"
              className="w-full"
              render={({ field }) => (
                <Select 
                  onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}
                  value={field.value}
                >
                  <SelectTrigger className="select-field">
                    <SelectValue placeholder="Proporção da tela" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(aspectRatioOptions).map((key) => (
                      <SelectItem key={key} value={key} className="select-item">
                        {aspectRatioOptions[key as AspectRatioKey].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}

          {(type === 'remove' || type === 'recolor') && (
            <>
              <CustomField
                control={form.control}
                name="prompt"
                formLabel={type === 'remove' ? "Objeto para remover" : "Objeto para recolorir"}
                className="w-full"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className="input-field"
                    onChange={(e) => onInputChangeHandler(
                      'prompt',
                      e.target.value,
                      type,
                      field.onChange
                    )}
                  />
                )}
              />

              {type === 'recolor' && (
                <CustomField
                  control={form.control}
                  name="color"
                  formLabel={"Cor de substituição"}
                  className="w-full md:w-1/2"
                  render={({ field }) => (
                    <div className="color-picker-container">
                      <Input
                        value={field.value}
                        type="color"
                        onChange={(e) =>
                          onInputChangeHandler(
                            'color',
                            e.target.value,
                            'recolor',
                            field.onChange
                          )
                        }
                      />
                      <span className="color-code">{field.value}</span>
                    </div>
                  )}
                />
              )}
            </>
          )}
        </div>

        <div className="media-uploader-field">
          <CustomField
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
          />

          <TransformedImage
            image={image}
            type={type}
            title={form.getValues().title}
            isTransforming={isTransforming}
            setIsTransforming={setIsTransforming}
            transformationConfig={transformationConfig}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <Button
            type="button"
            className="submit-button"
            disabled={isSubmitting || isTransforming || newTransformation === null}
            onClick={onTransformHandler}
          >
            {isTransforming ? 'Transformando...' : transformationType?.labelButton}
          </Button>

          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={isSubmitting || isTransforming || !(image?.publicId && transformationConfig)}
          >
            {isSubmitting ? 'Enviando...' : 'Salvar transformação'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TransformationForm