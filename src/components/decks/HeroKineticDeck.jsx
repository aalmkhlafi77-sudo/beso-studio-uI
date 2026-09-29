import React from "react";
import { HeroKineticDeck as InspectorHeroKineticDeck } from "../inspector/HeroKineticDeck";

export default function HeroKineticDeck(props) {
  const { params, onChange, onParamChange, ...rest } = props;

  // Adapt between unified params/onChange and granular props
  const resolvedMedia = props.media || params?.media || params?.kinetic_tracks || params || {};
  const resolvedLighting = props.lighting || params?.lighting || {};
  const resolvedAnimations = props.animations || params?.animations || {};
  const resolvedTypography = props.typography || params?.typography || {};

  const handleMediaChange = (key, val) => {
    if (props.onMediaChange) {
      props.onMediaChange(key, val);
    } else if (onParamChange) {
      onParamChange("kinetic_tracks", key, val);
    } else if (onChange) {
      onChange("kinetic_tracks", { ...(params?.kinetic_tracks || {}), [key]: val });
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

  const handleAnimationsChange = (key, val) => {
    if (props.onAnimationsChange) {
      props.onAnimationsChange(key, val);
    } else if (onParamChange) {
      onParamChange("animations", key, val);
    } else if (onChange) {
      onChange("animations", { ...(params?.animations || {}), [key]: val });
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
    <InspectorHeroKineticDeck
      activeTab={props.activeTab || "kinetic_tracks"}
      media={resolvedMedia}
      onMediaChange={handleMediaChange}
      lighting={resolvedLighting}
      onLightingChange={handleLightingChange}
      animations={resolvedAnimations}
      onAnimationsChange={handleAnimationsChange}
      typography={resolvedTypography}
      onTypographyChange={handleTypographyChange}
      theme={props.theme || "dark"}
      {...rest}
    />
  );
}

export { HeroKineticDeck };
