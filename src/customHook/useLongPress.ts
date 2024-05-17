// import { useCallback, useRef  } from "react";


// interface LongPressOptions {
//   onStart?: (event: MouseEvent | TouchEvent) => void;
//   onFinish?: (event: MouseEvent | TouchEvent) => void;
//   threshold?: number;
//   preventDefault?: boolean;
//   cancelOnMove?: boolean;
//   stopPropagation?: boolean;
// }

// const useLongPress = (
//   callback: (event: MouseEvent | TouchEvent) => void,
//   {
//     onStart = () => {},
//     onFinish = () => {},
//     threshold = 300,
//     preventDefault = true,
//     cancelOnMove = false,
//     stopPropagation = false,
//   }: LongPressOptions = {}
// ) => {
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const startX = useRef<number | null>(null);
//   const startY = useRef<number | null>(null);

//   const start = useCallback(
//     (event: MouseEvent | TouchEvent) => {
//       if (preventDefault && event.target) {
//         (event.target as HTMLElement).addEventListener("contextmenu", (e) =>
//           e.preventDefault()
//         );
//       }
//       if (stopPropagation) {
//         event.stopPropagation();
//       }

//       startX.current =
//         event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
//       startY.current =
//         event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
//       onStart(event);

//       timerRef.current = setTimeout(() => {
//         callback(event);
//       }, threshold);
//     },
//     [callback, onStart, preventDefault, stopPropagation, threshold]
//   );

//   const stop = useCallback(
//     (event: MouseEvent | TouchEvent, shouldTriggerCallback: boolean = true) => {
//       if (preventDefault && event.target) {
//         (event.target as HTMLElement).removeEventListener("contextmenu", (e) =>
//           e.preventDefault()
//         );
//       }

//       clearTimeout(timerRef.current as any);
//       if (shouldTriggerCallback) {
//         onFinish(event);
//       }
//     },
//     [onFinish, preventDefault]
//   );

//   const move = useCallback(
//     (event: MouseEvent | TouchEvent) => {
//       if (cancelOnMove) {
//         const dx = Math.abs(
//           event instanceof MouseEvent
//             ? event.clientX - (startX.current as number)
//             : event.touches[0].clientX - (startX.current as number)
//         );
//         const dy = Math.abs(
//           event instanceof MouseEvent
//             ? event.clientY - (startY.current as number)
//             : event.touches[0].clientY - (startY.current as number)
//         );
//         if (dx > 10 || dy > 10) {
//           stop(event, false);
//         }
//       }
//     },
//     [cancelOnMove, stop]
//   );

//   const handlers = {
//     onMouseDown: start,
//     onTouchStart: start,
//     onMouseUp: (event: MouseEvent) => stop(event),
//     onTouchEnd: (event: TouchEvent) => stop(event),
//     onTouchMove: move,
//     onMouseMove: move,
//   };

//   return handlers;
// };

// export { useLongPress };

import { useCallback, useRef } from "react";

interface LongPressOptions {
  onStart?: (event: MouseEvent | TouchEvent) => void;
  onFinish?: (event: MouseEvent | TouchEvent) => void;
  threshold?: number;
  preventDefault?: boolean;
  cancelOnMove?: boolean;
  stopPropagation?: boolean;
}

const useLongPress = (
  callback: (event: MouseEvent | TouchEvent) => void,
  {
    onStart = () => {},
    onFinish = () => {},
    threshold = 300,
    preventDefault = true,
    cancelOnMove = false,
    stopPropagation = false,
  }: LongPressOptions = {}
) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  const start = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (preventDefault && event.target) {
        (event.target as HTMLElement).addEventListener("contextmenu", (e) =>
          e.preventDefault()
        );
      }
      if (stopPropagation) {
        event.stopPropagation();
      }

      if (event instanceof MouseEvent) {
        startX.current = event.clientX;
        startY.current = event.clientY;
      } else if (event.touches && event.touches.length > 0) {
        startX.current = event.touches[0].clientX;
        startY.current = event.touches[0].clientY;
      }

      onStart(event);

      timerRef.current = setTimeout(() => {
        callback(event);
      }, threshold);
    },
    [callback, onStart, preventDefault, stopPropagation, threshold]
  );

  const stop = useCallback(
    (event: MouseEvent | TouchEvent, shouldTriggerCallback: boolean = true) => {
      if (preventDefault && event.target) {
        (event.target as HTMLElement).removeEventListener("contextmenu", (e) =>
          e.preventDefault()
        );
      }

      clearTimeout(timerRef.current as any);
      if (shouldTriggerCallback) {
        onFinish(event);
      }
    },
    [onFinish, preventDefault]
  );

  const move = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (cancelOnMove) {
        let dx = 0;
        let dy = 0;

        if (event instanceof MouseEvent) {
          dx = Math.abs(event.clientX - (startX.current as number));
          dy = Math.abs(event.clientY - (startY.current as number));
        } else if (event.touches && event.touches.length > 0) {
          dx = Math.abs(event.touches[0].clientX - (startX.current as number));
          dy = Math.abs(event.touches[0].clientY - (startY.current as number));
        }

        if (dx > 10 || dy > 10) {
          stop(event, false);
        }
      }
    },
    [cancelOnMove, stop]
  );

  const handlers = {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: (event: MouseEvent) => stop(event),
    onTouchEnd: (event: TouchEvent) => stop(event),
    onTouchMove: move,
    onMouseMove: move,
  };

  return handlers;
};

export { useLongPress };
