class Note:
  def __init__(self, pitch: str, value: int, dotted: bool):
    self.pitch = pitch
    self.value = value
    self.dotted = dotted
  
  def get_pitch(self):
    return self.pitch
  
  def set_pitch(self, pitch):
    self.pitch = pitch

  def get_value(self):
    return self.value
  
  def set_value(self, value):
    self.value = value
  
  def is_dotted(self):
    return self.dotted
  
  def set_dotted(self, dotted):
    self.dotted = dotted