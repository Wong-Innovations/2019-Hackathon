import mingus
import mingus.extra.musicxml as musicxml
import mingus.core.notes as notes
import mingus.core.value as value
from mingus.containers import Note
from mingus.containers import Bar
from mingus.containers import Track
import pickle

song = Track()

bar = Bar()

bar.place_notes(Note('C', 4), value.whole)

song.add_bar(bar)
bar = Bar()

bar.place_notes(Note('C', 4), value.half)
bar.place_notes(Note('C', 4), value.half)

song.add_bar(bar)
bar = Bar()

bar.place_notes(Note('C', 4), value.quarter)
bar.place_notes(Note('C', 4), value.quarter)
bar.place_notes(Note('C', 4), value.quarter)
bar.place_notes(Note('C', 4), value.quarter)

song.add_bar(bar)
bar = Bar()

bar.place_notes(Note('C', 4), value.eighth)
bar.place_notes(Note('C', 4), value.eighth)
bar.place_notes(Note('C', 4), value.eighth)
bar.place_notes(Note('C', 4), value.eighth)
bar.place_notes(Note('C', 4), value.eighth)
bar.place_notes(Note('C', 4), value.eighth)
bar.place_notes(Note('C', 4), value.eighth)
bar.place_notes(Note('C', 4), value.eighth)

song.add_bar(bar)
bar = Bar()

for _ in range(16):
  bar.place_notes(Note('C', 4), value.sixteenth)

song.add_bar(bar)
bar = Bar()

bar.place_notes(Note('E', 4), value.quarter)
bar.place_notes(Note('G', 4), value.quarter)
bar.place_notes(Note('C', 4), value.dots(value.quarter))
bar.place_notes(Note('D', 4), value.eighth)

song.add_bar(bar)
bar = Bar()

bar.place_notes(Note('A', 4), value.dots(value.half))
bar.place_notes(Note('C', 5), value.eighth)
bar.place_notes(Note('B', 4), value.eighth)

song.add_bar(bar)
bar = Bar()

bar.place_notes(Note('C', 4), value.quarter)
bar.place_notes(Note('D', 4), value.quarter)
bar.place_notes(Note('E', 4), value.quarter)
bar.place_notes(Note('F', 4), value.dots(value.eighth))
bar.place_notes(Note('E', 4), value.sixteenth)

song.add_bar(bar)
bar = Bar()

test_song_pickle = open("test_song.pickle", "wb")
pickle.dump(song, test_song_pickle)
test_song_pickle.close()

test_song_xml = musicxml.from_Track(song)

test_song_xml_file = open("test_song.musicxml", "w")
test_song_xml_file.write(test_song_xml)
test_song_xml_file.close()