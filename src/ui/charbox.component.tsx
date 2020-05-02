import React from 'react'

type CharboxProps = HasChar | Empty | Reward

interface HasChar {
    type : 'char'
    char: string
}

interface Empty {
    type: 'empty'
}

interface Reward {
    type: 'reward'
    rewardType: 'char' | 'word'
    multiplier: number
}

export function CharboxComponent(props: CharboxProps) {
    // todo: calculate height and width
    return <div className='ba f3 mw2 h2 flex'>P</div>
}
