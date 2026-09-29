import React from "react";
import { GeneralDeck as InspectorGeneralDeck } from "../inspector/GeneralDeck";

export default function GeneralDeck(props) {
  const { params, onChange, onParamChange, activeTab, ...rest } = props;

  const resolvedDimensions = props.dimensions || params?.dimensions || {};
  const resolvedLighting = props.lighting || params?.lighting || {};
  const resolvedTypography = props.typography || params?.typography || {};
  const resolvedAnimations = props.animations || params?.animations || {};
  const resolvedMedia = props.media || params?.media || params?.materials || {};
  const resolvedGlobal = props.globalParams || params?.globalParams || {};

  const handleDimensionsChange = (key, val) => {
    if (props.onDimensionsChange) {
      props.onDimensionsChange(key, val);
    } else if (onParamChange) {
      onParamChange("dimensions", key, val);
    } else if (onChange) {
      onChange("dimensions", { ...(params?.dimensions || {}), [key]: val });
    }
  };

  const handleLightingChange = (key, val) => {
    if (props.onLightingChange) {
      props.onLightingChange(key, val);
    } else if (onParamChange) {
      onParamChange("lighting", key, val);
    } else if (onChange) {
      onChange("lighting", { ...(params?.lighting || {}), [key]: val });
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

  const handleAnimationsChange = (key, val) => {
    if (props.onAnimationsChange) {
      props.onAnimationsChange(key, val);
    } else if (onParamChange) {
      onParamChange("animations", key, val);
    } else if (onChange) {
      onChange("animations", { ...(params?.animations || {}), [key]: val });
    }
  };

  const handleMediaChange = (key, val) => {
    if (props.onMediaChange) {
      props.onMediaChange(key, val);
    } else if (onParamChange) {
      onParamChange("media", key, val);
    } else if (onChange) {
      onChange("media", { ...(params?.media || {}), [key]: val });
    }
  };

  const handleGlobalChange = (key, val) => {
    if (props.onGlobalChange) {
      props.onGlobalChange(key, val);
    } else if (onParamChange) {
      onParamChange("globalParams", key, val);
    } else if (onChange) {
      onChange("globalParams", { ...(params?.globalParams || {}), [key]: val });
    }
  };

  return (
    <InspectorGeneralDeck
      activeTab={activeTab || "typography"}
      dimensions={resolvedDimensions}
      onDimensionsChange={handleDimensionsChange}
      lighting={resolvedLighting}
      onLightingChange={handleLightingChange}
      typography={resolvedTypography}
      onTypographyChange={handleTypographyChange}
      animations={resolvedAnimations}
      onAnimationsChange={handleAnimationsChange}
      media={resolvedMedia}
      onMediaChange={handleMediaChange}
      globalParams={resolvedGlobal}
      onGlobalChange={handleGlobalChange}
      theme={props.theme || "dark"}
      {...rest}
    />
  );
}

export { GeneralDeck };
