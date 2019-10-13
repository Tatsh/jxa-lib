/**
Original source:
```applescript
(*
Refresh Selected Tags v1.0
June 6, 2006 (yes, that's 6/6/06)
http://marv.kordix.com
*)
tell application "iTunes"
    if selection is {} then
        display dialog "No tracks selected. Select some tracks with some
                        stale tags."
            buttons {"I will!"}
            default button 1 with icon 0
    else
        set sel to selection
        repeat with myTrack in sel
            if myTrack's class is file track then
                tell myTrack
                    refresh myTrack
                end tell
            end if
        end repeat
        display dialog "Selected tags have been freshened up."
            buttons {"Okay"}
            default button 1
    end if
end tell
```
*/
export default function refreshSelectedTags(): 0 | 1;
