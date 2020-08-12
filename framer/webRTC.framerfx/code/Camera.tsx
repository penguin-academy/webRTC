import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

import CameraComponent from "../../../components/Camera.tsx"

export function Camera(props) {
    const borderRadius = props.mixedRadius
        ? `${props.topLeft}px ${props.topRight}px ${props.bottomRight}px ${props.bottomLeft}px`
        : `${props.radius}px`
    const style = {
        width: "100%",
        height: "100%",
        backgroundColor: props.color || null,
        borderRadius,
        transform: "rotateY(180deg)",
    }

    if (RenderTarget.current() === RenderTarget.thumbnail) {
        return <div style={style} />
    }

    return (
        <CameraComponent
            style={{ ...style, objectFit: props.cover ? "cover" : "contain" }}
            poster={
                RenderTarget.current() === RenderTarget.preview
                    ? null
                    : props.image
            }
        />
    )
}

addPropertyControls(Camera, {
    image: {
        title: "Placeholder",
        type: ControlType.Image,
    },
    color: {
        title: "Fill",
        type: ControlType.Color,
        defaultValue: "#AEC3D0",
    },
    cover: {
        title: "Cover",
        type: ControlType.Boolean,
        defaultValue: true,
    },
    radius: {
        type: ControlType.FusedNumber,
        title: "Radius",
        defaultValue: 0,
        toggleKey: "mixedRadius",
        toggleTitles: ["All", "Individual"],
        valueKeys: ["topLeft", "topRight", "bottomRight", "bottomLeft"],
        valueLabels: ["TL", "TR", "BR", "BL"],
        min: 0,
    },
})
