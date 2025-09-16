import { useEffect, useState } from "react";
export default function useDebounce(value, delay=1000){
    const[debounced,setDebounced] = useState(value);
    // console.log(value)
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value),delay);
        // console.log(id)
        // console.log(debounced)
        return () => clearTimeout(id);
    },[value,delay]);
    return debounced;
}


// Why debounce helps (a mini timeline)
// Assume delay = 600 ms and the user types “Paris” quickly:
// t=0ms: P → city="P" → setTimeout(600)
// t=80ms: a → city="Pa" → clear previous timeout → setTimeout(600)
// t=140ms: r → city="Par" → clear → setTimeout(600)
// t=230ms: i → city="Pari" → clear → setTimeout(600)
// t=300ms: s → city="Paris" → clear → setTimeout(600)
// t=900ms: (no more typing) → timeout fires → debouncedCity="Paris"
// → effect runs → dispatch(fetchWeather("Paris")).
// ✅ Result: 1 API call, not 5.
// If the user hits Enter, you dispatch immediately, skipping the debounce.
// Why your effect uses debouncedCity, not city
// If you used city directly in the effect, you would dispatch on every keystroke.
// Using debouncedCity ensures the dispatch only happens after the user stops typing for the delay time.

// Quick mental model
// city changes instantly with every keystroke.
// debouncedCity changes only after the user pauses typing for delay ms.
// The effect watches debouncedCity, so the API call happens once per pause, not per keystroke.
// Pressing Enter or Search triggers the API immediately with the current city.
// That’s the whole flow—clean, efficient, and user-friendly.