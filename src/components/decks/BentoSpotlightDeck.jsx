import React from "react";
import { BentoSpotlightDeck as InspectorBentoSpotlightDeck } from "../inspector/BentoSpotlightDeck";

export default function BentoSpotlightDeck(props) {
  const { params, onChange, onParamChange, ...rest } = props;

  const resolvedMedia = props.media || params?.media || params?.bento_glow || params || {};
  const resolvedTypography = props.typography || params?.typography || {};

  const handleMediaChange = (key, val) => {
    if (props.onMediaChange) {
      props.onMediaChange(key, val);
    } else if (onParamChange) {
      onParamChange("bento_glow", key, val);
    } else if (onChange) {
      onChange("bento_glow", { ...(params?.bento_glow || {}), [key]: val });
    }
  };

  const handleTypographyChange = (key, val) => {
    if (props.onTypographyChange) {
      props.onTypographyChange(key, val);
    } else if (onParamChange) {
      onParamChange("typography", key, val);
    } else if (onChange) {
      onChange("typography", { ...(params?.typography || {}), [key]: val });
    }
  };

  return (
    <InspectorBentoSpotlightDeck
      activeTab={props.activeTab || "bento_glow"}
      media={resolvedMedia}
      onMediaChange={handleMediaChange}
      typography={resolvedTypography}
      onTypographyChange={handleTypographyChange}
      theme={props.theme || "dark"}
      {...rest}
    />
  );
}

export { BentoSpotlightDeck };
