import { useCallback, useMemo, type KeyboardEvent } from "react";
import { createEditor, type Descendant, Editor, Element as SlateElement, Transforms, type BaseEditor } from "slate";
import { Slate, Editable, withReact, type ReactEditor, useSlate } from "slate-react";
import { withHistory, type HistoryEditor } from "slate-history";
import isHotkey from "is-hotkey";
import { IconButton, Tooltip, Separator } from "@radix-ui/themes";
import {
  TbBold, TbItalic, TbUnderline, TbStrikethrough,
  TbH1, TbH2, TbH3,
  TbList, TbListNumbers,
  TbQuote, TbCode,
} from "react-icons/tb";
import "./slate-editor.scss";

// ── Types ──────────────────────────────────────────────────────────────────────

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

type ParagraphElement = { type: "paragraph"; children: CustomText[] };
type HeadingOneElement = { type: "heading-one"; children: CustomText[] };
type HeadingTwoElement = { type: "heading-two"; children: CustomText[] };
type HeadingThreeElement = { type: "heading-three"; children: CustomText[] };
type BlockQuoteElement = { type: "block-quote"; children: CustomText[] };
type BulletedListElement = { type: "bulleted-list"; children: ListItemElement[] };
type NumberedListElement = { type: "numbered-list"; children: ListItemElement[] };
type ListItemElement = { type: "list-item"; children: CustomText[] };
type CodeBlockElement = { type: "code-block"; children: CustomText[] };

type CustomElement =
  | ParagraphElement
  | HeadingOneElement
  | HeadingTwoElement
  | HeadingThreeElement
  | BlockQuoteElement
  | BulletedListElement
  | NumberedListElement
  | ListItemElement
  | CodeBlockElement;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

// ── Constants ──────────────────────────────────────────────────────────────────

const HOTKEYS: Record<string, string> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+shift+s": "strikethrough",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const EMPTY_VALUE: Descendant[] = [
  { type: "paragraph", children: [{ text: "" }] },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor) as Record<string, boolean> | null;
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: Editor, format: string) => {
  const { selection } = editor;
  if (!selection) return false;
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  );
  return !!match;
};

const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
    split: true,
  });

  const newType = isActive ? "paragraph" : isList ? "list-item" : format;
  Transforms.setNodes(editor, { type: newType } as Partial<CustomElement>);

  if (!isActive && isList) {
    const block = { type: format, children: [] } as unknown as CustomElement;
    Transforms.wrapNodes(editor, block);
  }
};

// ── Renderers ──────────────────────────────────────────────────────────────────

const renderElement = (props: any) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>;
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "code-block":
      return <pre {...attributes}><code>{children}</code></pre>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const renderLeaf = (props: any) => {
  const { attributes, children, leaf } = props;
  let el = children;
  if (leaf.bold) el = <strong>{el}</strong>;
  if (leaf.italic) el = <em>{el}</em>;
  if (leaf.underline) el = <u>{el}</u>;
  if (leaf.strikethrough) el = <s>{el}</s>;
  if (leaf.code) el = <code>{el}</code>;
  return <span {...attributes}>{el}</span>;
};

const MarkButton = ({ format, icon: Icon, label }: { format: string; icon: any; label: string }) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);
  return (
    <Tooltip content={label}>
      <IconButton
        variant="ghost"
        size="1"
        color={isActive ? "blue" : "gray"}
        onMouseDown={(e: React.MouseEvent) => {
          e.preventDefault();
          toggleMark(editor, format);
        }}
        style={{ background: isActive ? "var(--accent-3)" : undefined }}
      >
        <Icon size={15} />
      </IconButton>
    </Tooltip>
  );
};

const BlockButton = ({ format, icon: Icon, label }: { format: string; icon: any; label: string }) => {
  const editor = useSlate();
  const isActive = isBlockActive(editor, format);
  return (
    <Tooltip content={label}>
      <IconButton
        variant="ghost"
        size="1"
        color={isActive ? "blue" : "gray"}
        onMouseDown={(e: React.MouseEvent) => {
          e.preventDefault();
          toggleBlock(editor, format);
        }}
        style={{ background: isActive ? "var(--accent-3)" : undefined }}
      >
        <Icon size={15} />
      </IconButton>
    </Tooltip>
  );
};

export interface SlateEditorProps {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  readOnly?: boolean;
  placeholder?: string;
}

export default function SlateEditor({ value, onChange, readOnly = false, placeholder = "Write something..." }: SlateEditorProps) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event as any)) {
          event.preventDefault();
          toggleMark(editor, HOTKEYS[hotkey]);
        }
      }
    },
    [editor]
  );

  return (
    <div className={`slate-editor ${readOnly ? "slate-editor--readonly" : ""}`}>
      <Slate editor={editor} initialValue={value} onChange={onChange}>
        {!readOnly && (
          <div className="slate-editor__toolbar">
            <MarkButton format="bold" icon={TbBold} label="Bold (Ctrl+B)" />
            <MarkButton format="italic" icon={TbItalic} label="Italic (Ctrl+I)" />
            <MarkButton format="underline" icon={TbUnderline} label="Underline (Ctrl+U)" />
            <MarkButton format="strikethrough" icon={TbStrikethrough} label="Strikethrough" />
            <MarkButton format="code" icon={TbCode} label="Inline Code (Ctrl+`)" />
            <Separator orientation="vertical" size="1" style={{ height: 16, margin: "0 4px" }} />
            <BlockButton format="heading-one" icon={TbH1} label="Heading 1" />
            <BlockButton format="heading-two" icon={TbH2} label="Heading 2" />
            <BlockButton format="heading-three" icon={TbH3} label="Heading 3" />
            <Separator orientation="vertical" size="1" style={{ height: 16, margin: "0 4px" }} />
            <BlockButton format="bulleted-list" icon={TbList} label="Bulleted List" />
            <BlockButton format="numbered-list" icon={TbListNumbers} label="Numbered List" />
            <BlockButton format="block-quote" icon={TbQuote} label="Quote" />
          </div>
        )}
        <Editable
          className="slate-editor__editable"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={readOnly}
          spellCheck
        />
      </Slate>
    </div>
  );
}

// ── Serialization Utilities ────────────────────────────────────────────────────

/** Convert plain text string to Slate value */
export function deserialize(text: string): Descendant[] {
  if (!text || !text.trim()) return EMPTY_VALUE;
  return text.split("\n").map((line) => ({
    type: "paragraph" as const,
    children: [{ text: line }],
  }));
}

/** Convert Slate value to plain text string */
export function serialize(nodes: Descendant[]): string {
  return nodes.map((n) => serializeNode(n)).join("\n");
}

function serializeNode(node: Descendant): string {
  if ("text" in node) return node.text;
  if ("children" in node) {
    return (node as CustomElement).children.map((c: any) => serializeNode(c)).join("");
  }
  return "";
}
