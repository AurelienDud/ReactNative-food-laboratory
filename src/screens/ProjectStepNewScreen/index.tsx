import { AssetUploader } from "@/src/components/AssetUploader";
import { Form } from "@/src/components/Form";
import { ScreenContainer } from "@/src/components/ScreenContainer";
import { Spacer } from "@/src/components/Spacer";
import { ThemedText } from "@/src/components/ThemedText";
import { usePostProjectStep } from "@/src/data/mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { projectStepNewFormSchema, ProjectStepNewFormValues, projectStepNewFormValuesToProject } from "./form";

export const ProjectStepNewScreen: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProjectStepNewFormValues>({
    resolver: zodResolver(projectStepNewFormSchema),
    defaultValues: {
      title: '',
      description: '',
      occurred_at: new Date(),
    },
  });

  const { mutate: mutateNewProjectStep, isPending } = usePostProjectStep({
    onSuccess: () => router.back(),
  });

  const onSubmit = async (values: ProjectStepNewFormValues) => {
    mutateNewProjectStep(projectStepNewFormValuesToProject(values));
  };

  return (
    <ScreenContainer>
      <Spacer size="large">
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <Form.TextField
              label="Title"
              placeholder="Title"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.title}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <Form.TextField
              label="Description"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={4}
              error={errors.description}
            />
          )}
        />

        <Controller
          control={control}
          name="occurred_at"
          render={({ field: { onChange, value } }) => (
            <Form.DateField
              label="Starting date"
              value={value}
              onChange={date => date && onChange(date)}
            />
          )}
        />

        <Spacer size="small">
          <ThemedText>
            Documents
          </ThemedText>
          <AssetUploader />
        </Spacer>
        
        <Form.Submit
          onSubmit={handleSubmit(onSubmit)}
          isDisabled={!isValid || isSubmitting}
          isLoading={isPending}
        >
          Create
        </Form.Submit>
      </Spacer>
    </ScreenContainer>
  );
}