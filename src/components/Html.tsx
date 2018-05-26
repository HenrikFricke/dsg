import * as React from "react";

export interface Props {
  content: string;
}

export const Html: React.StatelessComponent<Props> = props => {
  return (
    <html>
      <head>
        <title>Home | Dynamic Site Generator</title>
      </head>
      <body dangerouslySetInnerHTML={{ __html: props.content }} />
    </html>
  );
};
