import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Brand Icons
import {
  faCcAmex,
  faCcDiscover,
  faCcMastercard,
  faCcVisa,
  faCanadianMapleLeaf,
} from '@fortawesome/free-brands-svg-icons';
//duoTone Icons
import {
  faCircleExclamation,
  faCreditCard as duoToneCreditCard,
  faCheckCircle as duoToneCheckCircle,
  faCircleQuestion as duoToneCircleQuestion,
  faCircleDollar as duoToneCircleDollar,
  faMoneyBill1,
  faEye as duoToneEye,
  faEnvelopeOpenText as duoToneEnvelopeOpenText,
  faMessageText as duoToneMessageText,
  faReceipt as duoToneReceipt,
  faTicket as duoToneCoupon,
  faRectangleBarcode as duoToneUPC,
  faMicrochip as duoToneMicrochip,
  faHashtag as duoToneHash,
  faFile as duoToneFile,
  faFolderClosed as duoToneFolderClosed,
} from '@fortawesome/pro-duotone-svg-icons';
// Light Icons
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faBoxDollar,
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faArrowUp,
  faAt,
  faBrush,
  faCalendar as faCalendarLight,
  faCalendarDay,
  faCheck,
  faCheckCircle,
  faCirclePhone,
  faClock,
  faCreditCard as faCreditCardLight,
  faDollarSign as faDollarLight,
  faDollarSign as faDollarSignLight,
  faSquareDollar as faSquareDollarLight,
  faDoorClosed,
  faEnvelope as faEnvelopeLight,
  faExchange,
  faFileTimes,
  faHandHoldingBox,
  faHome,
  faImages,
  faInventory,
  faLongArrowUp,
  faMap,
  faMapMarker,
  faMessageText,
  faMinusSquare,
  faRoute,
  faScanner,
  faScannerKeyboard,
  faSearch,
  faSitemap,
  faSquare,
  faTimes,
  faTruckMoving,
  faUser as faUserLight,
  faCubes,
  faScrewdriverWrench,
  faCog,
  faChevronDown as faChevronDownLight,
  faCode,
} from '@fortawesome/pro-light-svg-icons';
// Regular Icons
import {
  faFolder,
  faFile,
  faBarcode,
  faBars,
  faBell,
  faCircle,
  faDotCircle,
  faEdit,
  faEllipsisH,
  faEllipsisV,
  faFilter,
  faList,
  faMoneyBill,
  faQuestionCircle,
  faXmark as faXmarkRegular,
  faSquare as faRegularSquare,
  faSquareDollar,
  faTrashAlt,
  faUserSlash,
} from '@fortawesome/pro-regular-svg-icons';
// Solid Icons
import {
  faAddressCard,
  faAlarmClock,
  faAngleUp,
  faBringForward,
  faCalendar,
  faCamera,
  faCar,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faCarSide,
  faCaretUp,
  faCheckCircle as approve,
  faCircleExclamation as faCircleExclamationSolid,
  faCheckSquare,
  faChevronCircleRight,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faCloud,
  faCloudUpload,
  faCreditCard,
  faDirections,
  faDollarSign,
  faEnvelope,
  faEraser,
  faExclamation,
  faExclamationTriangle,
  faExpand,
  faExternalLink,
  faEye,
  faFilter as solidFilter,
  faGasPump,
  faGavel,
  faHome as faSolidHome,
  faInfo,
  faKey,
  faLock,
  faMapMarkerAlt,
  faMapMarker as solidMapMarker,
  faMinus,
  faPaperPlane,
  faPlus,
  faReceipt,
  faQuestion,
  faRedo,
  faRoute as solidRoute,
  faSearch as solidSearch,
  faSendBackward,
  faShuttleVan,
  faSignalStream,
  faSirenOn,
  faSquare as solidSquare,
  faSync,
  faTag,
  faThumbsDown,
  faThumbsUp,
  faTimesCircle as reject,
  faTruckFast,
  faTruckMonster,
  faTruckPickup,
  faUndo,
  faUnlock,
  faUser,
  faWavePulse,
  faCheck as faCheckSolid,
  faCircleSmall,
  faCircleInfo,
  faSquareXmark,
} from '@fortawesome/pro-solid-svg-icons';

export default function install(app) {
  const customLibrary = [
    faFolder,
    faFile,
    faCog,
    faScrewdriverWrench,
    faCubes,
    faBoxDollar,
    faAddressCard,
    approve,
    faAlarmClock,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faArrowUp,
    faAt,
    faBarcode,
    faBars,
    faBell,
    faBringForward,
    faBrush,
    faCalendar,
    faCalendarLight,
    faCalendarDay,
    faCamera,
    faCar,
    faCaretDown,
    faCaretLeft,
    faCaretRight,
    faCaretUp,
    faCarSide,
    faCcAmex,
    faCcDiscover,
    faCcMastercard,
    faCcVisa,
    faCheck,
    faCheckCircle,
    faCheckSquare,
    faChevronCircleRight,
    faChevronDown,
    faChevronUp,
    faChevronLeft,
    faChevronRight,
    faCircle,
    faCircleExclamation,
    faCirclePhone,
    faClock,
    faCloud,
    faCloudUpload,
    faCreditCard,
    faCreditCardLight,
    faDirections,
    faDollarLight,
    faDollarSign,
    faDollarSignLight,
    faDoorClosed,
    faDotCircle,
    duoToneCreditCard,
    duoToneCheckCircle,
    duoToneCircleQuestion,
    duoToneCircleDollar,
    duoToneEye,
    duoToneMessageText,
    duoToneEnvelopeOpenText,
    duoToneReceipt,
    duoToneFile,
    duoToneFolderClosed,
    faEdit,
    faEllipsisH,
    faEllipsisV,
    faEnvelope,
    faEnvelopeLight,
    faEraser,
    faExchange,
    faExclamation,
    faExclamationTriangle,
    faExpand,
    faExternalLink,
    faEye,
    faFileTimes,
    faFilter,
    faGasPump,
    faGavel,
    faHandHoldingBox,
    faHome,
    faImages,
    faInfo,
    faInventory,
    faKey,
    faList,
    faLock,
    faLongArrowUp,
    faMap,
    faMapMarker,
    faMapMarkerAlt,
    faMessageText,
    faMinus,
    faMinusSquare,
    faMoneyBill,
    faMoneyBill1,
    faPaperPlane,
    faPlus,
    faQuestion,
    faQuestionCircle,
    faReceipt,
    faRedo,
    faRoute,
    faScanner,
    faScannerKeyboard,
    faSearch,
    faSendBackward,
    faShuttleVan,
    faSignalStream,
    faSirenOn,
    faSitemap,
    faSolidHome,
    faSquare,
    faRegularSquare,
    faSquareDollar,
    faSquareDollarLight,
    faSync,
    faTag,
    faThumbsDown,
    faThumbsUp,
    faTimes,
    faTrashAlt,
    faTruckFast,
    faTruckMonster,
    faTruckMoving,
    faTruckPickup,
    faUndo,
    faUnlock,
    faUser,
    faUserLight,
    faUserSlash,
    reject,
    solidFilter,
    faCircleExclamationSolid,
    solidMapMarker,
    solidRoute,
    solidSearch,
    solidSquare,
    duoToneCoupon,
    duoToneUPC,
    faWavePulse,
    duoToneMicrochip,
    duoToneHash,
    faChevronDownLight,
    faCheckSolid,
    faCircleSmall,
    faCircleInfo,
    faCanadianMapleLeaf,
    faSquareXmark,
    faCode,
    faXmarkRegular,
  ];

  library.add(...customLibrary);
  app.component('FontAwesomeIcon', FontAwesomeIcon);
}
