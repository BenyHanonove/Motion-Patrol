interface FormFieldModel {
  label: string;
  type: string;
  val: string;
  setVal: (val: string) => void;
}

export type { FormFieldModel };
