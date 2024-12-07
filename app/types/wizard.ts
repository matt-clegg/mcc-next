export type WizardStep = {
  id: string;
  component: Component;
  disabled?: boolean;
  props?: Record<string, any>;
};
