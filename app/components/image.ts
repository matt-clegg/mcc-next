import { mergeAttributes, Node } from "@tiptap/core";

const ImageExtension = Node.create({
  name: "image",
  group: "inline",
  inline: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[src]"
      }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["img", mergeAttributes((HTMLAttributes))];
  },

  addCommands() {
    return {
      setImage: options =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options
          });
        }
    };
  }
});

export default ImageExtension;
