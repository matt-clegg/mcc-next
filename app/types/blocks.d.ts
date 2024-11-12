export type BlockType = "image" | "header" | "prose";

export interface BaseBlock {
  type: BlockType;
}

export interface BlockImage extends BaseBlock {
  type: "image";
  src: string;
  alt?: string;
}

export interface BlockHeader extends BaseBlock {
  type: "header";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

export interface BlockProse extends BaseBlock {
  type: "prose";
  content: string;
}

export type Block = BlockImage | BlockHeader | BlockProse;
