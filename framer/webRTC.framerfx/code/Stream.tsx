import * as React from "react"
import * as io from "socket.io-client"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

import StreamComponent from "../../../components/Stream.tsx"

const { useRef, useEffect, useState } = React

export function Stream(props) {
    const borderRadius = props.mixedRadius
        ? `${props.topLeft}px ${props.topRight}px ${props.bottomRight}px ${props.bottomLeft}px`
        : `${props.radius}px`
    const style = {
        width: "100%",
        height: "100%",
        backgroundColor: props.color || null,
        borderRadius,
    }

    if (RenderTarget.current() === RenderTarget.thumbnail) {
        return <div style={style} />
    }

    return (
        <StreamComponent
            roomID={props.roomID}
            style={{ ...style, objectFit: props.cover ? "cover" : "contain" }}
            server={props.server}
        />
    )
}

addPropertyControls(Stream, {
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
    server: {
        type: ControlType.String,
        title: "Server",
        defaultValue: "https://penguin-signaling-server.herokuapp.com/",
    },
    roomID: {
        type: ControlType.String,
        title: "Room ID",
        defaultValue: (Math.random() * 10000000).toString(),
    },
})
