import { Form } from "@/src/components/Form";
import { ScreenContainer } from "@/src/components/ScreenContainer";
import { Spacer } from "@/src/components/Spacer";
import { usePostProject } from "@/src/data/mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { projectNewFormSchema, ProjectNewFormValues, projectNewFormValuesToProject } from "./form";

export const ProjectNewScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProjectNewFormValues>({
    resolver: zodResolver(projectNewFormSchema),
    defaultValues: {
      title: '',
      description: '',
      created_at: new Date(),
    },
  });

  const { mutate: mutateNewProject } = usePostProject();

  const onSubmit = async (values: ProjectNewFormValues) => {
    mutateNewProject(projectNewFormValuesToProject(values));
  };

  return (
    <ScreenContainer>
      <Spacer>
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
          name="created_at"
          render={({ field: { onChange, value } }) => (
            <Form.DateField
              label="Starting date"
              value={value}
              onChange={date => date && onChange(date)}
            />
          )}
        />

        <Form.Submit
          onSubmit={handleSubmit(onSubmit)}
          isDisabled={!isValid || isSubmitting}
        >
          Create
        </Form.Submit>
      </Spacer>
    </ScreenContainer>
  );
}