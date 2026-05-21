import { zodResolver } from '@hookform/resolvers/zod';
import { createToolSchema, type ToolFormData } from '../../validators/tools';
import BackdropBlur from './BackdropBlur';
import { FormProvider, useForm, type Resolver } from 'react-hook-form';
import { useCreateTool } from '../../hooks/tools/useCreateTool';
import { Loader2, X } from 'lucide-react';
import FormField from '../forms/FormField';
import FormInput from '../forms/FormInput';
import FormSelect, { type Option } from '../forms/FormSelect';
import { CATEGORIES, DEPARTMENTS, STATUSES } from '../../constants/tools';
import { toast } from 'sonner';
interface CreateToolModalProps {
  onClose: () => void;
}
const CreateToolModal: React.FC<CreateToolModalProps> = props => {
  const { onClose } = props;
  const form = useForm<ToolFormData>({
    resolver: zodResolver(createToolSchema) as Resolver<ToolFormData>,
    mode: 'onChange',
    defaultValues: {
      status: 'active',
      monthly_cost: 0,
    },
  });

  const createMutation = useCreateTool(() => {
    onClose();
    toast.success('Create tool success', {
      description: 'The tool has been successfully created',
    });
  });
  const onSubmit = async (data: ToolFormData) => createMutation.mutate(data);

  const categoriesOptions: Option[] = CATEGORIES.map(c => {
    return {
      label: c,
      value: c,
    };
  });
  const departmentsOptions: Option[] = DEPARTMENTS.map(d => {
    return {
      label: d,
      value: d,
    };
  });

  const statusOption: Option[] = STATUSES.map(s => {
    return {
      label: s.label,
      value: s.value,
    };
  });

  return (
    <>
      <BackdropBlur handleClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl pointer-events-auto flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Add New Tool
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Add a new tool to your catalog
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors min-w-11 min-h-11 flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>
          {/* BOdy */}
          <FormProvider {...form}>
            <form
              id="create-tool-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-1 overflow-y-auto p-6 flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="Name" name="name" required>
                  <FormInput {...form.register('name')} />
                </FormField>
                <FormField label="Vendor" name="vendor" required>
                  <FormInput {...form.register('vendor')} />
                </FormField>
                <FormField label="Description" name="description">
                  <FormInput as="textarea" {...form.register('description')} />
                </FormField>
                <FormField label="Website url" name="website_url">
                  <FormInput {...form.register('website_url')} />
                </FormField>
                <FormField label="Monthly Cost" name="monthly_cost">
                  <FormInput
                    {...form.register('monthly_cost')}
                    type="number"
                    min={0}
                    step={0.01}
                    placeholder="0.00"
                  />
                </FormField>
                <FormField label="Category" name="category">
                  <FormSelect
                    {...form.register('category')}
                    options={categoriesOptions}
                  />
                </FormField>
                <FormField label="Department" name="owner_department">
                  <FormSelect
                    {...form.register('owner_department')}
                    options={departmentsOptions}
                  />
                </FormField>
                <FormField label="Status" name="status">
                  <FormSelect
                    {...form.register('status')}
                    options={statusOption}
                  />
                </FormField>
              </div>
              {createMutation.isError && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                  An error occurred. Please try again.
                </div>
              )}
            </form>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors min-h-11"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="create-tool-form"
                disabled={
                  form.formState.isSubmitting || createMutation.isPending
                }
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors min-h-11 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {createMutation.isPending && (
                  <Loader2 size={14} className="animate-spin" />
                )}
                {createMutation.isPending ? 'Creating...' : 'Add Tool'}
              </button>
            </div>
          </FormProvider>
        </div>
      </div>
    </>
  );
};
export default CreateToolModal;
