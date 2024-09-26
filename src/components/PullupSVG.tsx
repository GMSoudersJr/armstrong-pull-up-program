import styles from "./PullupSVG.module.css";

const ARM_LENGTH = 90;
const TORSO_LENGTH = ARM_LENGTH * 0.8;
const SHOULDER_WIDTH = ARM_LENGTH / 2;
const WAIST_WIDTH = SHOULDER_WIDTH * 0.62;
const LEG_LENGTH = ARM_LENGTH * 1.25;
const PULLUP_DURATION = "3s";
const FOREARM_ROTATION = 18;
const UPPEREARM_ROTATION = 120;
const FOREARM_THICKNESS = 6;
const UPPERARM_THICKNESS = 12;
const THIGH_THICKNESS = 14;
const CALF_THICKNESS = 7;
const PULLUP_BAR = {
  horizontalPosition: 43.2,
  verticalHeight: 336.8,
  startWidth: 60,
  endWidth: 260,
};

const HAND = {
  left: {
    x: 110,
    y: PULLUP_BAR.horizontalPosition,
  },
  right: {
    x: 210,
    y: PULLUP_BAR.horizontalPosition,
  },
  radius: 8,
};

const WRIST = {
  left: {
    x: HAND.left.x,
    y: HAND.left.y,
  },
  right: {
    x: HAND.right.x,
    y: HAND.right.y,
  },
};

const ELBOW = {
  left: {
    x: WRIST.left.x + 5,
    y: WRIST.left.y + ARM_LENGTH / 2,
    joint: {
      cx: WRIST.left.x + 1,
      cy: WRIST.left.y + ARM_LENGTH / 2 - 1.5,
      r: 8,
    },
  },
  right: {
    x: WRIST.right.x - 5,
    y: WRIST.right.y + ARM_LENGTH / 2,
    joint: {
      cx: WRIST.right.x - 1,
      cy: WRIST.right.y + ARM_LENGTH / 2 + 1.5,
      r: 8,
    },
  },
};

const SHOULDER = {
  left: {
    x: ELBOW.left.x + 6,
    y: ELBOW.left.y + ARM_LENGTH / 2,
  },
  right: {
    x: ELBOW.right.x - 6,
    y: ELBOW.right.y + ARM_LENGTH / 2,
  },
};

const TORSO = {
  shoulder: {
    left: {
      x: SHOULDER.left.x + 8,
      y: SHOULDER.left.y - 4,
    },
    right: {
      x: SHOULDER.right.x - 8,
      y: SHOULDER.right.y - 4,
    },
  },
  waist: {
    left: {
      x: SHOULDER.left.x + 22,
      y: SHOULDER.left.y + TORSO_LENGTH,
    },
    right: {
      x: SHOULDER.right.x - 22,
      y: SHOULDER.right.y + TORSO_LENGTH,
    },
  },
};

const NECK = {
  top: {
    left: {
      x: (TORSO.shoulder.left.x + TORSO.shoulder.right.x) / 2 - 11.5,
      y: (TORSO.shoulder.left.y + TORSO.shoulder.right.y) / 2 - 18,
    },
    right: {
      x: (TORSO.shoulder.left.x + TORSO.shoulder.right.x) / 2 + 11.5,
      y: (TORSO.shoulder.left.y + TORSO.shoulder.right.y) / 2 - 18,
    },
  },
  base: {
    left: {
      x: TORSO.shoulder.left.x - 5.5,
      y: TORSO.shoulder.left.y - 5,
    },
    right: {
      x: TORSO.shoulder.right.x + 5.5,
      y: TORSO.shoulder.right.y - 5,
    },
  },
};

const HEAD = {
  cx: (NECK.top.left.x + NECK.top.right.x) / 2,
  cy: (NECK.top.left.y + NECK.top.right.y) / 2 - 20,
  rx: (NECK.top.left.x + NECK.top.right.x) / 25,
  ry: (NECK.top.left.y + NECK.top.right.y) / 10,
};

const HIP = {
  left: {
    x: TORSO.waist.left.x,
    y: TORSO.waist.left.y,
  },
  right: {
    x: TORSO.waist.right.x,
    y: TORSO.waist.right.y,
  },
};

const KNEE = {
  left: {
    x: HIP.left.x + 5,
    y: HIP.left.y + LEG_LENGTH / 2,
  },
  right: {
    x: HIP.right.x - 5,
    y: HIP.right.y + LEG_LENGTH / 2,
  },
};

const ANKLE = {
  left: {
    x: KNEE.left.x + 2,
    y: KNEE.left.y + LEG_LENGTH / 2,
  },
  right: {
    x: KNEE.right.x - 2,
    y: KNEE.right.y + LEG_LENGTH / 2,
  },
};

const PullupSVG = () => {
  return (
    <svg
      width={"100%"}
      height={"100%"}
      viewBox="0 0 320 350"
      xmlns="https://www.w3.org/2000/svg"
      className={styles.svg}
    >
      <polyline
        id="pullupBar"
        points={`
          ${PULLUP_BAR.startWidth},${PULLUP_BAR.verticalHeight}
          ${PULLUP_BAR.startWidth},${PULLUP_BAR.horizontalPosition}
          ${PULLUP_BAR.endWidth},${PULLUP_BAR.horizontalPosition}
          ${PULLUP_BAR.endWidth},${PULLUP_BAR.verticalHeight}
        `}
        style={{
          fill: "none",
          stroke: "yellow",
          strokeWidth: "8",
        }}
      />

      <circle
        id="leftHand"
        cx={HAND.left.x}
        cy={HAND.left.y}
        r={HAND.radius}
        fill="black"
        stroke="black"
        strokeWidth={"2"}
      ></circle>

      <circle
        id="rightHand"
        cx={HAND.right.x}
        cy={HAND.right.y}
        r={HAND.radius}
        fill="black"
        stroke="black"
        strokeWidth={"2"}
      />
      <line
        id="leftForearm"
        x1={WRIST.left.x}
        y1={WRIST.left.y}
        x2={ELBOW.left.x}
        y2={ELBOW.left.y}
        stroke="black"
        strokeWidth={FOREARM_THICKNESS}
        className={styles.line}
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          values={`0 ${WRIST.left.x} ${WRIST.left.y};
            ${FOREARM_ROTATION} ${WRIST.left.x} ${WRIST.left.y};
            0 ${WRIST.left.x} ${WRIST.left.y}`}
          dur={PULLUP_DURATION}
          repeatCount={"indefinite"}
        />
      </line>

      <line
        id="rightForearm"
        x1={WRIST.right.x}
        y1={WRIST.right.y}
        x2={ELBOW.right.x}
        y2={ELBOW.right.y}
        stroke="black"
        strokeWidth={FOREARM_THICKNESS}
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          values={`0 ${WRIST.right.x} ${WRIST.right.y};
          -${FOREARM_ROTATION} ${WRIST.right.x} ${WRIST.right.y};
          0 ${WRIST.right.x} ${WRIST.right.y}`}
          dur={PULLUP_DURATION}
          repeatCount={"indefinite"}
        />
      </line>

      <line
        id="leftUpperArm"
        x1={ELBOW.left.x}
        y1={ELBOW.left.y}
        x2={SHOULDER.left.x}
        y2={SHOULDER.left.y}
        stroke="black"
        strokeWidth={UPPERARM_THICKNESS}
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          values={`0 ${ELBOW.left.x} ${ELBOW.left.y};
          -${UPPEREARM_ROTATION} ${ELBOW.left.x} ${ELBOW.left.y};
          0 ${ELBOW.left.x} ${ELBOW.left.y}`}
          dur={PULLUP_DURATION}
          repeatCount={"indefinite"}
        />
        <animateMotion
          path={`M0,0 -10,0 0,0`}
          dur={PULLUP_DURATION}
          repeatCount={"indefinite"}
        />
      </line>

      <line
        id="rightUpperArm"
        x1={ELBOW.right.x}
        y1={ELBOW.right.y}
        x2={SHOULDER.right.x}
        y2={SHOULDER.right.y}
        stroke="black"
        strokeWidth={UPPERARM_THICKNESS}
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          values={`0 ${ELBOW.right.x} ${ELBOW.right.y};
          ${UPPEREARM_ROTATION} ${ELBOW.right.x} ${ELBOW.right.y};
          0 ${ELBOW.right.x} ${ELBOW.right.y}`}
          dur={PULLUP_DURATION}
          repeatCount={"indefinite"}
        />
        <animateMotion
          path={`M0,0 10,0 0,0`}
          dur={PULLUP_DURATION}
          repeatCount={"indefinite"}
        />
      </line>

      <polygon
        id="torso"
        points={`
        ${TORSO.shoulder.left.x}, ${TORSO.shoulder.left.y}
        ${TORSO.shoulder.right.x}, ${TORSO.shoulder.right.y}
        ${TORSO.waist.right.x}, ${TORSO.waist.right.y}
        ${TORSO.waist.left.x}, ${TORSO.waist.left.y}
        `}
        style={{ fill: "black", stroke: "black", strokeWidth: 10 }}
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values={`0; 0, -60; 0;`}
          dur={PULLUP_DURATION}
          repeatCount={"indefinite"}
        />
      </polygon>

      <polygon
        id="neck"
        points={`
          ${NECK.top.left.x}, ${NECK.top.left.y}
          ${NECK.top.right.x}, ${NECK.top.right.y}
          ${NECK.base.right.x}, ${NECK.base.right.y}
          ${NECK.base.left.x}, ${NECK.base.left.y}
        `}
        style={{ fill: "black", stroke: "black", strokeWidth: 1 }}
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values={`0; 0, -60; 0;`}
          dur={PULLUP_DURATION}
          repeatCount={"indefinite"}
        />
      </polygon>

      <ellipse id="head" cx={HEAD.cx} cy={HEAD.cy} rx={HEAD.rx} ry={HEAD.ry}>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values={`0; 0, -60; 0;`}
          dur={PULLUP_DURATION}
          repeatCount={"indefinite"}
        />
      </ellipse>

      <line
        id="leftThigh"
        x1={HIP.left.x}
        y1={HIP.left.y}
        x2={KNEE.left.x}
        y2={KNEE.left.y}
        stroke="black"
        strokeWidth={THIGH_THICKNESS}
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values={`0; 0, -60; 0;`}
          dur={PULLUP_DURATION}
          repeatCount={"indefinite"}
        />
      </line>
      <line
        id="rightThigh"
        x1={HIP.right.x}
        y1={HIP.right.y}
        x2={KNEE.right.x}
        y2={KNEE.right.y}
        stroke="black"
        strokeWidth={THIGH_THICKNESS}
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values={`0; 0, -60; 0;`}
          dur={PULLUP_DURATION}
          repeatCount={"indefinite"}
        />
      </line>
      <line
        id="leftCalf"
        x1={KNEE.left.x}
        y1={KNEE.left.y}
        x2={ANKLE.left.x}
        y2={ANKLE.left.y}
        stroke="black"
        strokeWidth={CALF_THICKNESS}
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values={`0; 0, -60; 0;`}
          dur={PULLUP_DURATION}
          repeatCount={"indefinite"}
        />
      </line>
      <line
        id="rightCalf"
        x1={KNEE.right.x}
        y1={KNEE.right.y}
        x2={ANKLE.right.x}
        y2={ANKLE.right.y}
        stroke="black"
        strokeWidth={CALF_THICKNESS}
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values={`0; 0, -60; 0;`}
          dur={PULLUP_DURATION}
          repeatCount={"indefinite"}
        />
      </line>
    </svg>
  );
};

export default PullupSVG;
