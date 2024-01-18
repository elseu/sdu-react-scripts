interface POFileItem {
  obsolete: boolean;
  msgid: string;
  msgstr: string[];
  msgctxt: string;
  msgid_plural: string | null;
  references: string[];
  comments: string[];
}

export interface POFile {
  items: POFileItem[];
}

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
