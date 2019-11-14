class Group < ApplicationRecord
  has_many :messages
  has_many :groups_users
  has_many :users, through: :groups_users

  validates :name, presence: true, uniqueness: true

  def show_the_latest_message
    if (latest_message = messages.last).present?
      latest_message.content? ? latest_message.content : "*画像投稿あり"
    else
      "まだメッセージはありません。"
    end    
  end
end