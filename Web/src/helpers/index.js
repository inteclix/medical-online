export { default as chartjs } from './chartjs';
export { default as getInitials } from './getInitials';

export const scrollToTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
