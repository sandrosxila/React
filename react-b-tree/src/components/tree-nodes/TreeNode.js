import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {useMeasure} from "react-use";
import {useTransition, animated, config, useSpring} from 'react-spring';

function TreeNode(props) {

    // properties
    const [ref, {width}] = useMeasure();

    const [x, setX] = useState(window.innerWidth/2);
    const [y, setY] = useState(window.innerHeight/2);

    const {elements, level} = props;
    // console.log(elements);

    // react spring properties

    const treeNodeSpringProps = useSpring(
        {
            opacity: 1,
            position: 'absolute',
            transform: `translate3d(${ x }px,${5 + level * (window.innerHeight / 8)}px,0)`,
            lineHeight: `${window.innerHeight / 2 / 7.5 / 1.5}px`,
            height: `${window.innerHeight / 15}px`,
            config: {duration: 735},
            from: {
                opacity: 0,
                transform: `translate3d(${ x }px,${225}px,0)`,
                // transition: 'all 0.02s ease'
            }
        }
    );


    const elementTransitions = useTransition(elements, item => item, {
        config: {duration: 1000, ...config.gentle},
        from: {
            opacity: 0,
            maxWidth: '0px',
            // width : '0px',
        },
        enter: {
            opacity: 0.8,
            height: `${window.innerHeight / 15 / 1.5}px`,
            background: "rgba(0, 0, 0, 0) linear-gradient(-225deg, rgba(227, 253, 245, 0.32) 0%, rgba(255, 230, 250, 0.79) 100%) repeat scroll 0% 0%",
            textAlign: "center",
            lineHeight: `${window.innerHeight / 15 / 1.5}px`,
            maxWidth: '2000px',
            // width : '66px'
        },
        leave: {
            // opacity: 0,
            display: 'none',
            // maxWidth : '0px',
        }
    });

    const grads = [
        "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)",
        "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
        "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
        "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)",
        "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)",
        "linear-gradient(to top, #ebc0fd 0%, #d9ded8 100%)",
        "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)",
        "linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)",
        "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)",
        "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)",
        "linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)",
        "linear-gradient(45deg, blue 20%, fuchsia)"
    ];

    useEffect(() => {
        setX((window.innerWidth / 2) - (width / 2));
        // console.log(width);
    }, [width, elements]);
    return (

        <>
            {

                <animated.div ref={ref} style={
                    treeNodeSpringProps
                }>
                    <div className={"row p-1"} style={{
                        background: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
                        height: `${window.innerHeight / 15}px`,
                    }}>
                        {
                            elementTransitions.map((({item, key, props}) => (
                                    <animated.div className="col align-self-center mx-1" key={key} style={
                                        props
                                    }>
                                        {item}
                                    </animated.div>
                                )
                            ))
                        }
                    </div>
            ️ </animated.div>
            }
        </>
    );
}

export default TreeNode;