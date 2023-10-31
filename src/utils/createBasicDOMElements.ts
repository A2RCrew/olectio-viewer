import { State } from '../model/state';

import { updateState } from '../lib/state';


export const cleanDOM = (state: State): void => {
  if (state.olectioContainerNode) {
    state.olectioContainerNode.remove();
  }
  document.body.classList.remove(
    `olectio-${state.layout}-layout`,
    `olectio-${state.scrollMode}-scroll`,
    `olectio-${state.theme}-theme`,
  );
};

/**
 * Creates basic DOM elements for viewer
 * @param state Viewer state
 */
const createBasicDOMElements = (state: State): void => {
  document.body.classList.add(
    `olectio-${state.layout}-layout`,
    `olectio-${state.scrollMode}-scroll`,
    `olectio-${state.theme}-theme`,
  );

  // #region Container node
  const olectioContainerNode = document.createElement('div');
  olectioContainerNode.id = 'olectio-container';

  const backgroundCleaner = document.createElement('div');
  backgroundCleaner.classList.add('olectio-bg-cleaner');
  olectioContainerNode.appendChild(backgroundCleaner);
  // #endregion Container node

  // #region Main node
  const olectioViewerNode = document.createElement('div');
  olectioViewerNode.id = 'olectio-viewer';
  olectioContainerNode.appendChild(olectioViewerNode);
  // #endregion Main node

  // #region Content Wrapper and child nodes
  const contentWrapperNode = document.createElement('div');
  contentWrapperNode.classList.add('olectio-content-wrapper');
  olectioViewerNode.appendChild(contentWrapperNode);
  if (state.layout === 'flow' && state.textAlign) {
    contentWrapperNode.classList.add('olectio-force-text-align');
  }

  const contentPlaceholderNode = document.createElement('div');
  contentPlaceholderNode.id = 'olectio-content-placeholder';
  contentWrapperNode.appendChild(contentPlaceholderNode);

  const endOfChapterCalculatorNode = document.createElement('div');
  endOfChapterCalculatorNode.innerText = 'realEndOfChapter';
  endOfChapterCalculatorNode.classList.add('olectio-end-of-chapter-calculator');
  endOfChapterCalculatorNode.dataset.page = '-';
  contentWrapperNode.appendChild(endOfChapterCalculatorNode);
  // #endregion Content Wrapper and child nodes

  let pagesLabelsNode: HTMLDivElement | undefined;
  if (state.layout === 'flow') {
    // #region Content Wrapper Siblings
    pagesLabelsNode = document.createElement('div');
    pagesLabelsNode.classList.add('olectio-pages-labels');
    olectioViewerNode.appendChild(pagesLabelsNode);
  }

  const selectionHighlightsNode = document.createElement('div');
  selectionHighlightsNode.classList.add('olectio-highlights-layer', 'olectio-selection');
  olectioViewerNode.appendChild(selectionHighlightsNode);

  const selectionSelectorsNode = document.createElement('div');
  selectionSelectorsNode.classList.add('olectio-highlights-layer', 'olectio-selectors');
  olectioViewerNode.appendChild(selectionSelectorsNode);

  const searchTermsHighlightsNode = document.createElement('div');
  searchTermsHighlightsNode.classList.add('olectio-highlights-layer', 'olectio-search');
  olectioViewerNode.appendChild(searchTermsHighlightsNode);
  // #endregion Content Wrapper Siblings

  let scrollerNode: HTMLDivElement | undefined;
  let nextChapterButton: HTMLButtonElement | undefined;
  let prevChapterButton: HTMLButtonElement | undefined;

  if (state.config.experimental?.scrollbars) {
    scrollerNode = document.createElement('div');
    scrollerNode.classList.add('olectio-scroller');

    const scrollerContentNode = document.createElement('div');
    scrollerContentNode.classList.add('olectio-scroller-content');
    scrollerNode.appendChild(scrollerContentNode);
    olectioContainerNode.appendChild(scrollerNode);

    nextChapterButton = document.createElement('button');
    nextChapterButton.classList.add('olectio-button-chapter-navigation', 'olectio-next-chapter');
    olectioContainerNode.appendChild(nextChapterButton);

    prevChapterButton = document.createElement('button');
    prevChapterButton.classList.add('olectio-button-chapter-navigation', 'olectio-prev-chapter');
    olectioContainerNode.appendChild(prevChapterButton);
  }

  const dynamicStyleNode = document.createElement('link');
  dynamicStyleNode.rel = 'stylesheet';
  dynamicStyleNode.type = 'text/css';
  document.head.appendChild(dynamicStyleNode);

  const mainStylesheet = Array.from(document.styleSheets).find(
    (s) => s.href?.indexOf('olectio-viewer.css') !== -1,
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
