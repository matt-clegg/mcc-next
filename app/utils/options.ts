interface NewsStatusOption {
  value: NewsStatus;
  label: string;
}

export const newsStatusOptions: NewsStatusOption[] = [
  {
    value: "published",
    label: "Published"
  },
  {
    value: "draft",
    label: "Draft"
  },
  {
    value: "scheduled",
    label: "Scheduled"
  }
];
