import L from 'leaflet';

const leafleatIcon = (svgIcon, width, height, className) => {

    width?? 30
    height?? 30
    className?? ''
    
    return L.icon({
        iconUrl: svgIcon,
        iconRetinaUrl: svgIcon,
        iconAnchor: null,
        popupAnchor: [0, 0],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
        iconSize: new L.Point(width, height),
        className: `leaflet-div-icon ${className}`
    })

}


export default leafleatIcon;