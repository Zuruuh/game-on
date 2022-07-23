declare interface Document {
  selectOrThrow(selector: string): HTMLElement;
}

export type ValidatorFunction = (field: HTMLInputElement) => boolean;
