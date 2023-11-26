import { ImageAds } from "./styles";
interface AdsProps {
    src: any
}

export function Ads({ src }:AdsProps) {
    return (
        <ImageAds source={src} resizeMode="contain"/>
    )
}