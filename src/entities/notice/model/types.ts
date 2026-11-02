export interface Attachment {
  url: string;
  name: string;
  type: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  content: string[];
  attachments: Attachment[];
}
