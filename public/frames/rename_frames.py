import os
import re

def rename_frames():
    # Looks for files with "ezgif-frame-" and grabs the digits that follow
    pattern = re.compile(r'ezgif-frame-(\d+)')
    
    # Get all files in the current directory
    files = os.listdir('.')
    count = 0

    print("Starting renaming sequence...")

    for filename in sorted(files):
        match = pattern.search(filename)
        if match:
            # Extract the frame number (e.g., "070" -> 70)
            frame_num = int(match.group(1))
            
            # Extract the original file extension (.png, .jpg, etc.)
            ext = os.path.splitext(filename)[1]
            
            # Format to frame-070.png (3-digit zero padding)
            new_name = f"frame-{frame_num:03d}{ext}"
            
            try:
                os.rename(filename, new_name)
                print(f"Renamed: {filename} ➔ {new_name}")
                count += 1
            except Exception as e:
                print(f"Error renaming {filename}: {e}")

    print(f"\nDone! Successfully renamed {count} frames.")

if __name__ == "__main__":
    rename_frames()