from PIL import Image
import cv2 # I've never used this cs2 lib but it feels like I've seen it before!
# I bet Sikuli uses this under the hood!
import numpy as np

def find_orange_balls(image):
    image_cv = np.array(image)
    image_hsv = cv2.cvtColor(image_cv, cv2.COLOR_RGB2HSV)
    lower_orange = np.array([10, 100, 100])
    upper_orange = np.array([25, 255, 255])
    mask = cv2.inRange(image_hsv, lower_orange, upper_orange)
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    orange_balls_centers = []
    for ball in contours:
        M = cv2.moments(ball)
        if M['m00'] != 0:
            centerX = int(M['m10'] / M['m00'])
            centerY = int(M['m01'] / M['m00'])
            orange_balls_centers.append((centerX, centerY))

    return orange_balls_centers

def find_letters(image):
    # gray_image for cleaner image picking
    gray_image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2GRAY)

    letters = {'A': None, 'B': None, 'C': None}

    for letter in letters.keys():
        # This will look for the letters in the A_template.png, B_template and C_template pngs 
        template = cv2.imread(f'{letter}_template.png', 0)
        w, h = template.shape[::-1]
        # matchTemplate finds sub-images inside of larger images 
        result = cv2.matchTemplate(gray_image, template, cv2.TM_CCOEFF_NORMED)

        # This is like Sikuli! Fuzzy 80% match is good enough for me!
        threshold = 0.8
        loc = np.where(result >= threshold)

        if loc[0].size > 0 and loc[1].size > 0:
            letters[letter] = (loc[1][0] + w // 2, loc[0][0] + h // 2)

    return letters

def calculate_proximity(balls, letters):
    counts = {'A': 0, 'B': 0, 'C': 0}
    for ball in balls:
        closest_letter = min(letters, key=lambda x: distance(ball, letters[x]))
        counts[closest_letter] += 1
    return counts

def distance(point1, point2):
    return np.sqrt((point1[0] - point2[0])**2 + (point1[1] - point2[1])**2)

letters_count = {'A': 0, 'B': 0, 'C': 0}
image_paths = []
image_path = "orange_balls.png"
img = Image.open(image_path)
orangeBalls_LoT = find_orange_balls(img)
# print( orangeBalls_LoT ) # [(1257, 477), (1257, 476), etc etc


letters_LoT = find_letters(img) # {'A': (363, 277), 'B': (940, 279), 'C': (1520, 279)}
print("letters_LoT")
print(letters_LoT)
counts = calculate_proximity(orangeBalls_LoT, letters_LoT)
for letter, count in counts.items():
    letters_count[letter] += count

most_popular_letter = max(letters_count, key=letters_count.get)
print(f"The most popular letter is: {most_popular_letter}")

