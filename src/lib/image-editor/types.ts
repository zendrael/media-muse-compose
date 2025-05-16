
export interface ImageEditorState {
  brightness: number;
  contrast: number;
  filter: string | null;
  text: {
    value: string;
    fontSize: number;
    color: string;
    fontFamily: string;
  };
}

export interface FilterOption {
  name: string;
  preview: string;
  apply: (canvas: fabric.Canvas, imageElement: fabric.Image) => void;
}
