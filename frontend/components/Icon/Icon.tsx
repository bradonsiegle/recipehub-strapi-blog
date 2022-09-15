import { FC } from "react";
import { Icons } from "./Icons";
import styled from "@emotion/styled";

export type AvailableIcons = keyof typeof Icons;

export type Props = {
  /** Icon name*/
  name: AvailableIcons;
  /**Width and height */
  size?: number;
} & React.SVGProps<SVGSVGElement>;

export const Icon: FC<Props> = ({ name, size = 2, ...rest }) => {
  const Icon = styled(Icons[name])`
    color: ${({ theme }) => theme.font.regular};
  `;
  const sizeInRem = `${size}rem`;
  const sizes = { width: sizeInRem, height: sizeInRem };
  return <Icon role="img" aria-label={name} {...sizes} {...rest} />;
};
