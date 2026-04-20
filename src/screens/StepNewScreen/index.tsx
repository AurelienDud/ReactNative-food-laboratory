import { Form } from "@/src/components/Form";
import { ScreenContainer } from "@/src/components/ScreenContainer";
import { Spacer } from "@/src/components/Spacer";
import { usePostProjectStep } from "@/src/data/mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { stepNewFormSchema, StepNewFormValues, stepNewFormValuesToProject } from "./form";

export const StepNewScreen: FC = () => {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<StepNewFormValues>({
    resolver: zodResolver(stepNewFormSchema),
    defaultValues: {
      title: '',
      description: '',
      occurred_at: new Date(),
    },
  });

  const { mutate: mutateNewProjectStep, isPending } = usePostProjectStep({
    projectId: parseInt(projectId),
    onSuccess: () => router.back(),
  });

  const onSubmit = async (values: StepNewFormValues) => {
    mutateNewProjectStep(stepNewFormValuesToProject(values));
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
              autoFocus
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
              label="Event date"
              value={value}
              onChange={date => date && onChange(date)}
            />
          )}
        />

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