class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def index
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      flash[:notice] = "新規グループ作成成功！"
      redirect_to "/"
    else
      render :new
    end
  end

  def update
    if @group.update(group_params)
      flash[:notice] = "グループの編集に成功しました！"
      redirect_to group_messages_path(@group)
    else
      render :edit
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end

  def set_group
    @group = Group.find(params[:id])
  end

end
