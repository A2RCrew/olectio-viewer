import { State } from '../model/state';

import { updateState } from '../lib/state';


export const cleanDOM = (state: State): void => {
  if (state.olectioContainerNode) {
    state.olectioContainerNode.remove();
  }
  document.body.classList.remove(
    `rg-${state.layout}-layout`,
    `rg-${state.scrollMode}-scroll`,
    `rg-${state.theme}-theme`,
  );
};

/**
 * Creates basic DOM elements for viewer
 * @param state Viewer state
 */
const createBasicDOMElements = (state: State): void => {
  document.body.classList.add(
    `rg-${state.layout}-layout`,
    `rg-${state.scrollMode}-scroll`,
    `rg-${state.theme}-theme`,
  );

  // #region Container node
  const olectioContainerNode = document.createElement('div');
  olectioContainerNode.id = 'rg-container';

  const backgroundCleaner = document.createElement('div');
  backgroundCleaner.classList.add('rg-bg-cleaner');
  olectioContainerNode.appendChild(backgroundCleaner);
  // #endregion Container node

  // #region Main node
  const olectioViewerNode = document.createElement('div');
  olectioViewerNode.id = 'rg-viewer';
  olectioContainerNode.appendChild(olectioViewerNode);
  // #endregion Main node

  // #region Content Wrapper and child nodes
  const contentWrapperNode = document.createElement('div');
  contentWrapperNode.classList.add('rg-content-wrapper');
  olectioViewerNode.appendChild(contentWrapperNode);
  if (state.layout === 'flow' && state.textAlign) {
    contentWrapperNode.classList.add('rg-force-text-align');
  }

  const contentPlaceholderNode = document.createElement('div');
  contentPlaceholderNode.id = 'rg-content-placeholder';
  contentWrapperNode.appendChild(contentPlaceholderNode);

  const endOfChapterCalculatorNode = document.createElement('div');
  endOfChapterCalculatorNode.innerText = 'realEndOfChapter';
  endOfChapterCalculatorNode.classList.add('rg-end-of-chapter-calculator');
  endOfChapterCalculatorNode.dataset.page = '-';
  contentWrapperNode.appendChild(endOfChapterCalculatorNode);
  // #endregion Content Wrapper and child nodes

  let pagesLabelsNode: HTMLDivElement | undefined;
  if (state.layout === 'flow') {
    // #region Content Wrapper Siblings
    pagesLabelsNode = document.createElement('div');
    pagesLabelsNode.classList.add('rg-pages-labels');
    olectioViewerNode.appendChild(pagesLabelsNode);
  }

  const selectionHighlightsNode = document.createElement('div');
  selectionHighlightsNode.classList.add('rg-highlights-layer', 'rg-selection');
  olectioViewerNode.appendChild(selectionHighlightsNode);

  const selectionSelectorsNode = document.createElement('div');
  selectionSelectorsNode.classList.add('rg-highlights-layer', 'rg-selectors');
  olectioViewerNode.appendChild(selectionSelectorsNode);

  const searchTermsHighlightsNode = document.createElement('div');
  searchTermsHighlightsNode.classList.add('rg-highlights-layer', 'rg-search');
  olectioViewerNode.appendChild(searchTermsHighlightsNode);
  // #endregion Content Wrapper Siblings

  let scrollerNode: HTMLDivElement | undefined;
  let nextChapterButton: HTMLButtonElement | undefined;
  let prevChapterButton: HTMLButtonElement | undefined;

  if (state.config.experimental?.scrollbars) {
    scrollerNode = document.createElement('div');
    scrollerNode.classList.add('rg-scroller');

    const scrollerContentNode = document.createElement('div');
    scrollerContentNode.classList.add('rg-scroller-content');
    scrollerNode.appendChild(scrollerContentNode);
    olectioContainerNode.appendChild(scrollerNode);

    nextChapterButton = document.createElement('button');
    nextChapterButton.classList.add('rg-button-chapter-navigation', 'rg-next-chapter');
    olectioContainerNode.appendChild(nextChapterButton);

    prevChapterButton = document.createElement('button');
    prevChapterButton.classList.add('rg-button-chapter-navigation', 'rg-prev-chapter');
    olectioContainerNode.appendChild(prevChapterButton);
  }

  const dynamicStyleNode = document.createElement('link');
  dynamicStyleNode.rel = 'stylesheet';
  dynamicStyleNode.type = 'text/css';
  document.head.appendChild(dynamicStyleNode);

  const mainStylesheet = Array.from(document.styleSheets).find(
    (s) => s.href?.indexOf('read.garden-viewer.css') !== -1,
  );

  document.body.appendChild(olectioContainerNode);

  const containerWidth = contentWrapperNode.clientWidth;
  const containerHeight = contentWrapperNode.clientHeight;

  updateState({
    basicDOMElementsCreated: true,
    mainStyleNode: mainStylesheet?.ownerNode as HTMLLinkElement,
    olectioContainerNode,
    olectioViewerNode,
    contentWrapperNode,
    contentPlaceholderNode,
    endOfChapterCalculatorNode,
    pagesLabelsNode,
    selectionHighlightsNode,
    selectionSelectorsNode,
    searchTermsHighlightsNode,
    dynamicStyleNode,
    containerWidth,
    containerHeight,
    scrollerNode,
    nextChapterButton,
    prevChapterButton,
  });
};

export default createBasicDOMElements;
