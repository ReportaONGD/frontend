export class BaseModel<T> {
  value: T;
  key: string;
  controlType: string;
  required: boolean;
  visible: boolean;
  selected: object;
  constructor(key: string, value: T, controlType?: string, required?: boolean, visible?: boolean, selected?: object) {
    this.value = value;
    this.key = key || '';
    this.controlType = controlType || '';
    this.required = required !== undefined ? required : true;
    this.visible = visible !== undefined ? visible : true;
    this.selected = selected !== undefined ? selected : null;
  }
}
