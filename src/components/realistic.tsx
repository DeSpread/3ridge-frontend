// Realistic.tsx

// import { faFire } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CreateTypes, GlobalOptions, Options } from "canvas-confetti";
import React, { Component } from "react";
import ReactCanvasConfetti from "../lib/confetti/react-canvas-confetti";
import Backdrop from "@mui/material/Backdrop";
import { Box, Typography } from "@mui/material";
// import {delay} from "../util/timer";

export interface IProps extends Options, GlobalOptions {
  fire?: boolean;
  onFireComplete?: () => void;
  duration?: number;
}

export default class Realistic extends Component<IProps> {
  private isAnimationEnabled: boolean;
  private animationInstance: CreateTypes | null = null;

  constructor(props: IProps) {
    super(props);
    this.isAnimationEnabled = false;
    this.fire = this.fire.bind(this);
  }

  makeShot(particleRatio: number, opts: object) {
    this.animationInstance &&
      this.animationInstance({
        ...opts,
        origin: { y: 0.8 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }

  componentDidUpdate(prevProps: IProps) {
    const { fire, onFireComplete, duration } = this.props;
    if (fire !== prevProps.fire && fire) {
      this.handlerFire();
      setTimeout(() => {
        onFireComplete?.();
      }, duration ?? 1000);
    }
  }

  // 이 부분에서 사용하고 싶은 설정을 하면 된다.
  fire() {
    this.makeShot(0.25, {
      spread: 25,
      startVelocity: 55,
    });
  }

  handlerFire = () => {
    if (!this.isAnimationEnabled) {
      this.isAnimationEnabled = true;
    }
    requestAnimationFrame(this.fire);
    this.fire();
  };

  getInstance = (instance: CreateTypes | null) => {
    this.animationInstance = instance;
  };

  render() {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={this.props.fire ?? false}
          onClick={(e) => {}}
        >
          <div style={{ width: "100%", height: "100%", background: "" }}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Typography
                variant={"h3"}
                textAlign={"center"}
                sx={{ wordBreak: "keep-all" }}
              >
                축하합니다🎉 이벤트를 완료하셨습니다.
              </Typography>
            </Box>
            <ReactCanvasConfetti
              refConfetti={this.getInstance}
              className="canvas"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </Backdrop>
      </>
    );
  }
}
