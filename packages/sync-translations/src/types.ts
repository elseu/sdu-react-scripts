export type POEditorResponse = {
  response: {
    status: string;
    code: string;
    message: string;
  };
};

export type POEditorLanguagesResult = {
  result?: {
    languages: Array<{
      name: string;
      code: string;
      translations: number;
      percentage: number;
      updated: string;
    }>;
  };
};
