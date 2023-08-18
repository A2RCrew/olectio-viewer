import { SelectionRange } from '../viewerSettings';

export interface olectioEvent {
  type: string;
}

export interface EventWithSlugs {
  /**
   * Slug of the first level content (book, work...) to load
   */
  slug: string;
  /**
   * Product slug (in case it's different from main slug)
   */
  productSlug: string;
}

/**
 * On page change event
 */
export interface PageChange extends olectioEvent {
  type: 'pageChange';
  /**
   * New page label
   */
  label: string;
}

/**
 * On new content needed
 */
export interface LoadNewContent extends olectioEvent, EventWithSlugs {
  type: 'loadNewContent';
  /**
   * Slug of the second level content (page, chapter...) to load
   */
  contentSlug: string;
  /**
   * Go to end of new content
   */
  goToEnd?: boolean;
}

export interface ContentLoaded extends olectioEvent, EventWithSlugs {
  type: 'contentLoaded';
  /**
   * Loaded content slug
   */
  contentSlug: string;
}

export interface GetContentsInfo extends olectioEvent, EventWithSlugs {
  type: 'getContentsInfo';
}

export interface GetTerms extends olectioEvent, EventWithSlugs {
  type: 'getTerms';
  /**
   * Text to look for
   */
  text: string;
}

export interface LoadChapterInfo extends EventWithSlugs {
  /**
   * Current slug of the second level content (page, chapter...)
   */
  currentContentSlug: string;
}

export interface LoadNextChapter extends olectioEvent, LoadChapterInfo {
  type: 'loadNextChapter';
}

export interface LoadPreviousChapter extends olectioEvent, LoadChapterInfo {
  type: 'loadPreviousChapter';
  goToEnd?: boolean;
}

export interface OnUserSelect extends olectioEvent, EventWithSlugs {
  type: 'onUserSelect';
}

export interface OnHighlightClick extends olectioEvent, EventWithSlugs {
  type: 'onHighlightClick';
  key: string;
  ranges: SelectionRange[];
}

export interface OnSelectionMenuOptionClick extends olectioEvent, EventWithSlugs {
  type: 'onSelectionMenuOptionClick';
  key: string;
  highlightKey?: string;
  selectionInfo?: SelectionRange;
}

export interface OnCancelNewNote extends olectioEvent, EventWithSlugs {
  type: 'onCancelNewNote';
}

export interface OnSaveNote extends olectioEvent, EventWithSlugs {
  type: 'onSaveNote';
  note: string;
  key: string;
  highlightKey?: string;
  selectionInfo?: SelectionRange;
}

export interface OnChangeNote extends olectioEvent, EventWithSlugs {
  type: 'onChangeNote';
  key: string;
  highlightKey: string;
  editing: boolean;
  note?: string;
  selectionInfo?: SelectionRange;
}

export interface OnDeleteOptionClick extends olectioEvent, EventWithSlugs {
  type: 'onDeleteOptionClick';
  key: string;
}

export interface OnCopyOptionClick extends olectioEvent, EventWithSlugs {
  type: 'onCopyOptionClick';
  obfuscatedText: string;
}

export interface OnLinkLoaded extends olectioEvent, Pick<EventWithSlugs, 'slug'> {
  type: 'onLinkLoaded';
  link: string;
  href: string | null;
  target: string | null;
}

export interface OnLinkClick extends olectioEvent, EventWithSlugs {
  type: 'onLinkClick';
  url: string | null;
  querySelector: string;
}

export type olectioEvents =
  | PageChange
  | ContentLoaded
  | LoadNewContent
  | GetContentsInfo
  | GetTerms
  | LoadNextChapter
  | LoadPreviousChapter
  | OnUserSelect
  | OnHighlightClick
  | OnSelectionMenuOptionClick
  | OnCancelNewNote
  | OnSaveNote
  | OnChangeNote
  | OnDeleteOptionClick
  | OnCopyOptionClick
  | OnLinkClick
  | OnLinkLoaded;

export type olectioEventHandler = (event: olectioEvents) => Promise<void>;

export type CurrentPromiseEnder = (() => void) | null;

export interface UniqueKeyPromiseEnder {
  key?: string;
  resolve: () => void;
  reject: () => void;
}
