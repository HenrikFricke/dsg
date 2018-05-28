import * as React from "react";

export interface Props {
  content: string;
}

export const Html: React.StatelessComponent<Props> = props => {
  return (
    <html>
      <head>
        <title>Home | Dynamic Site Generator</title>
        <link rel="stylesheet" href="assets/styling.css" type="text/css" />
      </head>
      <body dangerouslySetInnerHTML={{ __html: props.content }} />
    </html>
  );
};
