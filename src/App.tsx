import { useEffect, useRef } from "react";
import "./App.css";
import * as Matter from "matter-js";
function App() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const arr = Array.from({ length: 200 }, (_, i) => i);

    const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite;
    const iEngine = Engine.create();
    const iRunner = Runner.create();
    const iRender = Render.create({
        element: document.body,
        engine: iEngine,
        options: {
            width: 2000,
            height: 800,
            wireframes: false,
            background: "white",
        },
    });
    const boxA = Bodies.rectangle(400, 200, 80, 80);
    //ball 100개 생성
    const getRandomBetween = (min: number, max: number) =>
        Math.random() * (max - min) + min;

    arr.map(() => {
        const index = Math.floor(Math.random() * 5);
        const posX = getRandomBetween(425, 1600);
        const posY = getRandomBetween(0, 400);
        const ball = Bodies.circle(posX, posY, 28, {
            render: {
                sprite: {
                    xScale: 1,
                    yScale: 1,
                    texture: `${"src/assets/png/e-" + index + ".png"}`,
                },
            },
        });

        const mouse = Matter.Mouse.create(iRender.canvas);

        const mouseConstraint = Matter.MouseConstraint.create(iEngine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        });

        Composite.add(iEngine.world, [ball, mouseConstraint]);
    });
    const floorLeft = Bodies.rectangle(400, 400, 50, 800, {
        isStatic: true,
        render: {
            fillStyle: "#121212",
        },
    });

    const floorRight = Bodies.rectangle(1600, 800 / 2, 50, 800, {
        isStatic: true,
        render: {
            fillStyle: "#121212",
        },
    });
    const ballB = Bodies.circle(460, 10, 40);
    const ground = Bodies.rectangle(800, 800, 1600, 60, { isStatic: true });
    Composite.add(iEngine.world, [boxA, ballB, ground, floorLeft, floorRight]);
    Runner.run(iRunner, iEngine);
    Render.run(iRender);

    useEffect(() => {
        if (!containerRef) return;
    }, [containerRef]);

    return <section ref={containerRef}></section>;
}

export default App;
