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

def generate_song(difficulty: float) -> List[Bar]:
  song = []

  for _ in range(16):
    song.append(generate_bar(difficulty))
  
  return song

def generate_bar(difficulty: float):
  some_bar = Bar('C', (4, 4))

  values = [value.whole, value.half, value.quarter, value.dots(value.half), value.eighth, value.dots(value.quarter), value.sixteenth, value.dots(value.eighth), value.thirty_second, value.dots(value.sixteenth)]

  actual_values = []

  pitches = [None, Note("A", 3), Note("B", 3), Note("C", 4), Note("D", 4), Note("E", 4), Note("F", 4), Note("G", 4), Note("A", 4), Note("B", 4), Note("C", 5), Note("D", 5), Note("E", 5),
             Note("F", 5), Note("G", 5), Note("A", 5), Note("B", 5), Note("C", 6)]

  if difficulty >= 10:
    actual_values = values
  else:
    index = math.ceil(difficulty)
    actual_values = values[0:index]
  
  
  while some_bar.place_notes(choice(pitches), choice(actual_values)):
    pass

  if not some_bar.is_full():
    some_bar.place_notes(None, some_bar.value_left)

ACCURACY = 100

def eval_fitness(genomes, config):
  nets = []
  ge = []
  ge_bars = []
  ge_note = []
  sum_ratios = []
  extra_notes = []

  for _, g in genomes:
    net = neat.nn.FeedForwardNetwork.create(g, config)
    nets.append(net)
    ge.append(g)
    sum_ratios.append(0)
    extra_notes.append(0)
    ge_bars.append(None)
    ge_note.append(None)
  
  song = generate_song(0)
  executions = ACCURACY * 4 * 16
  
  beat_time = 0
  time = 0
  beat = 0
  start_count = 0
  end_count = 0
  bar = song[0]
  bar_index = 0
  note_index = 0
  note_value = bar[note_index][1]
  start_time = 0
  end_time = start_time + ((1 / note_value) * 4 * ACCURACY)
  reset_start_time = False
  for _ in range(executions):
    if reset_start_time:
      note_index += 1
      note_value = bar[note_index][1]
      start_time = time
      end_time = start_time + ((1 / note_value) * 4 * ACCURACY)
      start_count = 0
      end_count = 0

      reset_start_time = False

    if beat_time == 100:
      beat_time = 0
      beat += 1

    for x, g in enumerate(ge):
      if ge_bars[x] == None:
        ge_bars[x] = song[0]
      
      if ge_note[x] == None:
        ge_note[x] = 0
      
      note_class = Note(ge_note[x][2])
      note_level = notes.note_to_int(note_class.name) + (note_class.octave * 11)

      output = nets[x].activate((ge_note[x][1], note_level, beat_time, 4, 4))

      if output[1] > 0.5:
        if start_count == end_count:
          start_count += 1

          if not ((start_count >= 2) and (end_count >= 2)):
            if abs(time - start_time) < abs(time - end_time):
              sum_ratios[x] += abs(time - start_time) / abs(end_time - start_time)
            else:
              sum_ratios[x] += abs(time - end_time) / abs(end_time - start_time)
          else:
            extra_notes[x] += 1
        elif start_count > end_count:
          end_count += 1

          if not ((start_count >= 2) and (end_count >= 2)):
            if abs(time - start_time) < abs(time - end_time):
              sum_ratios[x] += abs(time - start_time) / abs(end_time - start_time)
            else:
              sum_ratios[x] += abs(time - end_time) / abs(end_time - start_time)
          else:
            extra_notes[x] += 1
        else:
          raise NameError("You fucking donkey")
    
    if time == end_time:
      reset_start_time = True
    
    if time == 4 * ACCURACY:
      time = 0
      beat_time = 0
      beat = 0
      bar_index += 1
      bar = song[bar_index]

def run(config_file: str):
  config = neat.config.Config(neat.DefaultGenome, neat.DefaultReproduction, 
                              neat.DefaultSpeciesSet, neat.DefaultStagnation,
                              config_path)
  
  population = neat.Population(config)
  
  population.add_reporter(neat.StdOutReporter(True))
  stats = neat.StatisticsReporter()
  population.add_reporter(stats)

  population.run(eval_fitness, 100)

if __name__ == "__main__":
  local_dir = os.path.dirname(__file__)
  config_path = os.path.join(local_dir, "config-feedforward.txt")

  run(config_path)
