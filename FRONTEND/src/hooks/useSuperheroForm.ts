import { useState, useEffect } from "react";
import type { Image } from "@app-types/images/image.interface";
import { imageService } from "@services/images-service";
import { superheroService } from "@services/superhero-service";
import type { Superhero } from "@app-types/superhero/superhero.interface";
import type { SuperheroDTO } from "@app-types/superhero/superhero.type";
import { superheroSchema } from "../validation/superhero.schema";

type SuperheroFormState = SuperheroDTO & Partial<Pick<Superhero, "id">>;

const defaultValues: SuperheroDTO = {
  nickname: "",
  real_name: "",
  origin_description: "",
  superpowers: "",
  catch_phrase: "",
  images: [],
};

interface UseSuperheroFormProps {
  initialValues: Partial<Superhero> | null;
  onSuccess: () => void;
  onClose: () => void;
  open: boolean;
}

export const useSuperheroForm = ({
  initialValues,
  onSuccess,
  onClose,
  open,
}: UseSuperheroFormProps) => {
  const [form, setForm] = useState<SuperheroFormState>({
    ...defaultValues,
  } as SuperheroFormState);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setForm({ ...defaultValues, ...initialValues } as SuperheroFormState);
      setExistingImages(initialValues?.images || []);
      setNewFiles([]);
      setFormErrors({});
    }
  }, [open, initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (files: FileList) => {
    const filesArray = Array.from(files);
    setNewFiles((prev) => [...prev, ...filesArray]);
  };

  const handleRemoveExistingImage = async (imageId: string): Promise<void> => {
    try {
      setLoading(true);
      await imageService.deleteImage(imageId);
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
      onSuccess();
    } catch (error) {
      console.error("Failed to delete image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveNewFile = (fileIndex: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== fileIndex));
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    setFormErrors({});

    const validationResult = superheroSchema.safeParse(form);

    if (!validationResult.success) {
      const validationErrors: Record<string, string> = {};

      validationResult.error.issues.forEach((issue) => {
        const key = issue.path[0] as string | undefined;

        if (key) validationErrors[key] = issue.message;
      });

      setFormErrors(validationErrors);
      setLoading(false);

      return;
    }

    try {
      const payload: SuperheroDTO = {
        ...form,
        images: existingImages.map((img) => ({
          id: img.id,
          url: img.url,
          superheroId: form.id || "",
        })),
      };

      const savedSuperhero = form.id
        ? await superheroService.update(form.id, payload)
        : await superheroService.create(payload);

      if (newFiles.length > 0) {
        await Promise.all(
          newFiles.map((file) =>
            imageService.uploadImage(savedSuperhero.id, file)
          )
        );
      }

      onSuccess();
      onClose();
    } catch {
      throw new Error("Failed to save superhero");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    newFiles,
    existingImages,
    loading,
    formErrors,
    handleChange,
    handleFileChange,
    handleRemoveExistingImage,
    handleRemoveNewFile,
    handleSubmit,
  };
};
