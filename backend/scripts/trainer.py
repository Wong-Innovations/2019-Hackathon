from typing import List
import os
import math
import neat
import mingus
import mingus.core.notes as notes
from mingus.containers import Note
from mingus.containers import Bar
import mingus.core.value as value
from random import choice
import pickle

def generate_song(difficulty: float) -> List[Bar]:
  song = []

  for _ in range(16):
    song.append(generate_bar(difficulty))
  
  return song

def generate_bar(difficulty: float):
  some_bar = Bar('C', (4, 4))

  values = [value.whole, value.half, value.quarter, value.dots(value.half), value.eighth, value.dots(value.quarter), value.sixteenth, value.dots(value.eighth), value.thirty_second, value.dots(value.sixteenth)]

  actual_values = []

  pitches = [Note("A", 3), Note("B", 3), Note("C", 4), Note("D", 4), Note("E", 4), Note("F", 4), Note("G", 4), Note("A", 4), Note("B", 4), Note("C", 5), Note("D", 5), Note("E", 5),
             Note("F", 5), Note("G", 5), Note("A", 5), Note("B", 5), Note("C", 6)]

  if difficulty >= 10:
    actual_values = values
  else:
    index = math.ceil(difficulty)
    actual_values = values[0:index]
  
  while some_bar.place_notes(choice(pitches), choice(actual_values)):
    pass

  if not some_bar.is_full():
    some_bar.place_notes(choice(pitches), some_bar.value_left())
  
  return some_bar

ACCURACY = 100

def eval_fitness(genomes, config, difficulty=10):
  nets = []
  ge = []
  pitch_scores = []
  duration_ratios = []

  song = generate_song(difficulty)

  for _, g in genomes:
    net = neat.nn.FeedForwardNetwork.create(g, config)
    nets.append(net)
    ge.append(g)
    pitch_scores.append(0)
    duration_ratios.append(0)

  note_count = 0
  for bar_class in song:
    bar = bar_class.bar
    note_count_bar = len(bar)
    note_count += note_count_bar

    for note in bar:
      for x, _ in enumerate(ge):
        note_class = Note(note[2][0])
        note_level = decode_note(str(note_class))

        duration = note[1]

        output = nets[x].activate((duration, note_level))

        duration_ratios[x] += float(abs(output[0] - duration)) / float(duration)

        pitch_output = []

        for neuron in output[1:]:
          pitch_output.append(neuron)
        
        score = pitch_score(note_level, pitch_output)

        pitch_scores[x] += abs(score - 1)
  
  for x, g in enumerate(ge):
    average_ratio = duration_ratios[x] / note_count
    duration_accuracy = 0.5 * math.pow(2, -15 * average_ratio)

    average_pitch_accuracy = pitch_scores[x] / float(note_count)
    pitch_accuracy = 0.5 * math.pow(2, -15 * average_pitch_accuracy)

    fitness = duration_accuracy + pitch_accuracy

    ge[x].fitness = fitness
  

def run(config_file: str):
  config = neat.config.Config(neat.DefaultGenome, neat.DefaultReproduction, 
                              neat.DefaultSpeciesSet, neat.DefaultStagnation,
                              config_path)
  
  population = neat.Population(config)
  
  population.add_reporter(neat.StdOutReporter(True))
  stats = neat.StatisticsReporter()
  population.add_reporter(stats)

  winner = population.run(eval_fitness, 500)

  some_input = input("Save winner? ")
  if some_input == 'yes':
    try:
      pickle_in = open("saved_winners.pickle", "rb")
      current = pickle.load(pickle_in)
      pickle_in.close()
    except FileNotFoundError:
      current = None

    if current == None:
      current = []

    current.append(winner)

    pickle_out = open("saved_winners.pickle", "wb")

    pickle.dump(current, pickle_out)
    pickle_out.close()
  
  some_input = input("Display winners? ")
  if some_input == 'yes':
    pickle_in = open("saved_winners.pickle", "rb")
    them = pickle.load(pickle_in)
    print(them)

def pitch_score(level: int, pitch_output):
  expected = expected_pitch_output(level)

  difference_vector = []
  for actual, expected in zip(pitch_output, expected):
    difference = (actual - expected) * (actual - expected)

    difference_vector.append(difference)
  
  sum = 0
  for i in difference_vector:
    sum += i
  
  return sum

def expected_pitch_output(level: int):
  index = level

  vector = [0] * 17

  vector[index] = 1

  return vector

def decode_note(note_):
  notes = ["'A-3'", "'B-3'", "'C-4'", "'D-4'", "'E-4'", "'F-4'", "'G-4'", "'A-4'", "'B-4'", "'C-5'", "'D-5'", "'E-5'", "'F-5'", "'G-5'", "'A-5'", "'B-5'", "'C-6'"]

  index = None

  x = 0
  for note in notes:
    if note == note_:
      index = x
    x += 1

  return index

if __name__ == "__main__":
  local_dir = os.path.dirname(__file__)
  config_path = os.path.join(local_dir, "config-feedforward.txt")

  run(config_path)
