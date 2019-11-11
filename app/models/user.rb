class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :messages
  has_many :groups_users
  has_many :groups, through: :groups_users

  validates :password, length: { minimum: 8, message: "は最低8文字入力してください。" }, format: { with: /\A[a-z\d]+\z/i, message: "は半角英数字のみ使用可能です。" }, on: :create
  validates :email, format: { with: /\A[a-zA-Z0-9_#!$%&`'*+-{|}~^\/=?.]+@[a-zA-Z0-9][a-zA-Z0-9.-]+\z/ }
  validates :name, presence: true, uniqueness: true

end
