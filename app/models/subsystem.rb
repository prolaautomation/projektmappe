class Subsystem < ApplicationRecord
  belongs_to :project
  has_many :units, dependent: :destroy

  #delete association in grobengineerings if subsystem is deleted
  has_many :grobengineerings, dependent: :nullify
end
