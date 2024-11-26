export const ErrorMessage = (e: any) => {
  return { message: e instanceof Error ? e.message : 'An unknown error occurred' };
};
