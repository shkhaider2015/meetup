export interface LoaderProps {
  isVisible: boolean;
}

export interface LoaderContextProps {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}
